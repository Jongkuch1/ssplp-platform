// Teacher Dashboard Logic
document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (!currentUser.email || currentUser.role !== 'teacher') {
        window.location.href = 'login.html';
        return;
    }

    loadTeacherData();
    loadClasses();
    loadStudentActivity();
    loadMyContent();
});

function loadTeacherData() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    document.getElementById('teacherName').textContent = currentUser.firstName || 'Teacher';
    
    // Get or initialize teacher data
    let teacherData = JSON.parse(localStorage.getItem('teacherData') || '{}');
    if (!teacherData[currentUser.email]) {
        teacherData[currentUser.email] = {
            totalStudents: 0,
            contentCreated: 0,
            quizzesCreated: 0,
            classAverage: 0
        };
        localStorage.setItem('teacherData', JSON.stringify(teacherData));
    }
    
    const data = teacherData[currentUser.email];
    
    // Calculate stats from all students
    const allProgress = JSON.parse(localStorage.getItem('studentProgress') || '{}');
    const studentCount = Object.keys(allProgress).length;
    
    let totalScore = 0;
    let totalQuizzes = 0;
    Object.values(allProgress).forEach(progress => {
        totalScore += progress.totalScore || 0;
        totalQuizzes += progress.quizzesTaken || 0;
    });
    
    const classAvg = totalQuizzes > 0 ? Math.round(totalScore / totalQuizzes) : 0;
    
    document.getElementById('totalStudents').textContent = studentCount;
    document.getElementById('contentCreated').textContent = data.contentCreated || 0;
    document.getElementById('quizzesCreated').textContent = data.quizzesCreated || 0;
    document.getElementById('classAverage').textContent = classAvg + '%';
}

function loadClasses() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const students = users.filter(u => u.role === 'student');
    const totalStudents = students.length;
    
    const classes = [
        { name: 'Mathematics', icon: 'fa-calculator', color: '#2563eb' },
        { name: 'English', icon: 'fa-book-open', color: '#7c3aed' },
        { name: 'Physics', icon: 'fa-atom', color: '#10b981' },
        { name: 'Chemistry', icon: 'fa-flask', color: '#f59e0b' },
        { name: 'Biology', icon: 'fa-dna', color: '#ef4444' }
    ];
    
    const container = document.getElementById('myClasses');
    
    if (totalStudents === 0) {
        container.innerHTML = `
            <div class="info-item">
                <i class="fas fa-info-circle" style="color: #2563eb;"></i>
                <strong>No students enrolled yet</strong>
                <p style="margin: 5px 0 0 0; color: #64748b;">Students will appear here once they register</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = classes.map(cls => `
        <div class="class-item">
            <i class="fas ${cls.icon}" style="color: ${cls.color}; font-size: 1.5rem;"></i>
            <div style="flex: 1;">
                <strong>${cls.name}</strong>
                <p style="margin: 0; color: #64748b;">${totalStudents} student${totalStudents !== 1 ? 's' : ''} enrolled</p>
            </div>
            <button class="btn btn-primary btn-sm" onclick="window.location.href='progress.html'">View</button>
        </div>
    `).join('');
}

function loadStudentActivity() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const students = users.filter(u => u.role === 'student');
    const allProgress = JSON.parse(localStorage.getItem('studentProgress') || '{}');
    const container = document.getElementById('studentActivity');
    
    if (students.length === 0) {
        container.innerHTML = `
            <div class="activity-item">
                <i class="fas fa-info-circle" style="color: #2563eb;"></i>
                <div>
                    <strong>No Students Registered Yet</strong>
                    <p>Students will appear here once they register on the platform</p>
                </div>
            </div>
        `;
        return;
    }
    
    const activities = students.map(student => {
        const progress = allProgress[student.email] || { quizzesTaken: 0, lessonsCompleted: 0 };
        const displayName = student.firstName && student.lastName ? 
            `${student.firstName} ${student.lastName}` : 
            student.email.split('@')[0];
        
        return `
            <div class="activity-item">
                <i class="fas fa-user-graduate" style="color: #10b981;"></i>
                <div>
                    <strong>${displayName}</strong>
                    <p>${progress.quizzesTaken} quizzes taken, ${progress.lessonsCompleted} lessons completed</p>
                </div>
            </div>
        `;
    }).join('');
    
    container.innerHTML = activities;
}

function loadMyContent() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const teacherData = JSON.parse(localStorage.getItem('teacherData') || '{}');
    const data = teacherData[currentUser.email] || {};
    
    const container = document.getElementById('myContent');
    container.innerHTML = `
        <div class="info-item">
            <i class="fas fa-file-alt" style="color: #2563eb; margin-right: 10px;"></i>
            <strong>${data.contentCreated || 0} Learning Materials Uploaded</strong>
        </div>
        <div class="info-item">
            <i class="fas fa-question-circle" style="color: #7c3aed; margin-right: 10px;"></i>
            <strong>${data.quizzesCreated || 0} Quizzes Created</strong>
        </div>
        <div class="info-item">
            <i class="fas fa-chart-line" style="color: #10b981; margin-right: 10px;"></i>
            <strong>Analytics Dashboard Available</strong>
        </div>
    `;
}
