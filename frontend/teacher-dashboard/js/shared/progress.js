// Progress Tracking Logic
document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (!currentUser.email) {
        window.location.href = 'login.html';
        return;
    }

    if (currentUser.role === 'student') {
        loadStudentProgress();
    } else if (currentUser.role === 'teacher') {
        loadTeacherView();
    } else if (currentUser.role === 'admin') {
        loadAdminView();
    }
});

function loadStudentProgress() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const studentProgress = JSON.parse(localStorage.getItem('studentProgress') || '{}');
    const progress = studentProgress[currentUser.email] || {
        lessonsCompleted: 0,
        quizzesTaken: 0,
        totalScore: 0
    };

    const avgScore = progress.quizzesTaken > 0 
        ? Math.round(progress.totalScore / progress.quizzesTaken) 
        : 0;

    document.getElementById('progressStats').innerHTML = `
        <div class="stat-card">
            <i class="fas fa-book-reader"></i>
            <h3>${progress.lessonsCompleted || 0}</h3>
            <p>Lessons Completed</p>
        </div>
        <div class="stat-card">
            <i class="fas fa-clipboard-check"></i>
            <h3>${progress.quizzesTaken || 0}</h3>
            <p>Quizzes Taken</p>
        </div>
        <div class="stat-card">
            <i class="fas fa-star"></i>
            <h3>${avgScore}%</h3>
            <p>Average Score</p>
        </div>
    `;

    const subjects = ['Mathematics', 'English', 'Physics', 'Chemistry', 'Biology'];
    document.getElementById('progressList').innerHTML = subjects.map(subject => {
        const subjectProgress = Math.floor(Math.random() * 100);
        return `
            <div class="progress-item">
                <div style="flex: 1;">
                    <strong>${subject}</strong>
                    <div class="progress-bar" style="margin-top: 10px;">
                        <div class="progress-fill" style="width: ${subjectProgress}%"></div>
                    </div>
                </div>
                <span style="font-weight: bold; color: #2563eb;">${subjectProgress}%</span>
            </div>
        `;
    }).join('');
}

function loadTeacherView() {
    document.getElementById('pageTitle').textContent = 'Student Analytics';
    document.getElementById('pageSubtitle').textContent = 'Monitor student performance and progress';
    document.getElementById('progressTitle').textContent = 'All Students';

    const allProgress = JSON.parse(localStorage.getItem('studentProgress') || '{}');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const students = users.filter(u => u.role === 'student');

    let totalLessons = 0, totalQuizzes = 0, totalScore = 0;
    Object.values(allProgress).forEach(p => {
        totalLessons += p.lessonsCompleted || 0;
        totalQuizzes += p.quizzesTaken || 0;
        totalScore += p.totalScore || 0;
    });

    const avgScore = totalQuizzes > 0 ? Math.round(totalScore / totalQuizzes) : 0;

    document.getElementById('progressStats').innerHTML = `
        <div class="stat-card">
            <i class="fas fa-users"></i>
            <h3>${students.length}</h3>
            <p>Total Students</p>
        </div>
        <div class="stat-card">
            <i class="fas fa-book-reader"></i>
            <h3>${totalLessons}</h3>
            <p>Total Lessons</p>
        </div>
        <div class="stat-card">
            <i class="fas fa-clipboard-check"></i>
            <h3>${totalQuizzes}</h3>
            <p>Total Quizzes</p>
        </div>
        <div class="stat-card">
            <i class="fas fa-chart-bar"></i>
            <h3>${avgScore}%</h3>
            <p>Class Average</p>
        </div>
    `;

    document.getElementById('progressList').innerHTML = students.map(student => {
        const progress = allProgress[student.email] || {};
        const score = progress.quizzesTaken > 0 
            ? Math.round(progress.totalScore / progress.quizzesTaken) 
            : 0;
        return `
            <div class="progress-item">
                <i class="fas fa-user-graduate" style="color: #2563eb; font-size: 1.5rem;"></i>
                <div style="flex: 1;">
                    <strong>${student.firstName} ${student.lastName}</strong>
                    <p style="margin: 5px 0; color: #64748b;">
                        ${progress.lessonsCompleted || 0} lessons, ${progress.quizzesTaken || 0} quizzes
                    </p>
                </div>
                <span style="font-weight: bold; color: #2563eb;">${score}%</span>
            </div>
        `;
    }).join('');
}

function loadAdminView() {
    document.getElementById('pageTitle').textContent = 'User Management';
    document.getElementById('pageSubtitle').textContent = 'Manage all platform users';
    document.getElementById('progressTitle').textContent = 'All Users';

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const students = users.filter(u => u.role === 'student');
    const teachers = users.filter(u => u.role === 'teacher');
    const admins = users.filter(u => u.role === 'admin');

    document.getElementById('progressStats').innerHTML = `
        <div class="stat-card">
            <i class="fas fa-users"></i>
            <h3>${users.length}</h3>
            <p>Total Users</p>
        </div>
        <div class="stat-card">
            <i class="fas fa-user-graduate"></i>
            <h3>${students.length}</h3>
            <p>Students</p>
        </div>
        <div class="stat-card">
            <i class="fas fa-chalkboard-teacher"></i>
            <h3>${teachers.length}</h3>
            <p>Teachers</p>
        </div>
        <div class="stat-card">
            <i class="fas fa-user-shield"></i>
            <h3>${admins.length}</h3>
            <p>Admins</p>
        </div>
    `;

    const roleColors = { student: '#2563eb', teacher: '#10b981', admin: '#f59e0b' };
    const roleIcons = { student: 'fa-user-graduate', teacher: 'fa-chalkboard-teacher', admin: 'fa-user-shield' };

    document.getElementById('progressList').innerHTML = users.map(user => `
        <div class="progress-item">
            <i class="fas ${roleIcons[user.role]}" style="color: ${roleColors[user.role]}; font-size: 1.5rem;"></i>
            <div style="flex: 1;">
                <strong>${user.firstName} ${user.lastName}</strong>
                <p style="margin: 5px 0; color: #64748b;">${user.email}</p>
            </div>
            <span class="role-badge" style="background: ${roleColors[user.role]}; padding: 5px 15px; border-radius: 20px; color: white; font-size: 12px;">
                ${user.role.toUpperCase()}
            </span>
        </div>
    `).join('');
}
