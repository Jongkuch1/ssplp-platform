// Admin Dashboard Logic
document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (!currentUser.email || currentUser.role !== 'admin') {
        window.location.href = 'login.html';
        return;
    }

    loadAdminData();
    loadSystemMetrics();
    loadUserManagement();
});

function loadAdminData() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    document.getElementById('adminName').textContent = currentUser.firstName || 'Admin';
    
    // Count users by role
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const students = users.filter(u => u.role === 'student').length;
    const teachers = users.filter(u => u.role === 'teacher').length;
    
    document.getElementById('totalUsers').textContent = users.length;
    document.getElementById('totalStudents').textContent = students;
    document.getElementById('totalTeachers').textContent = teachers;
}

function loadSystemMetrics() {
    const studentProgress = JSON.parse(localStorage.getItem('studentProgress') || '{}');
    const teacherData = JSON.parse(localStorage.getItem('teacherData') || '{}');
    
    let totalQuizzes = 0;
    let totalLessons = 0;
    let totalContent = 0;
    
    Object.values(studentProgress).forEach(progress => {
        totalQuizzes += progress.quizzesTaken || 0;
        totalLessons += progress.lessonsCompleted || 0;
    });
    
    Object.values(teacherData).forEach(data => {
        totalContent += data.contentCreated || 0;
    });
    
    const container = document.getElementById('systemMetrics');
    container.innerHTML = `
        <div class="metric-item">
            <i class="fas fa-book-reader" style="color: #2563eb;"></i>
            <div>
                <h4>${totalLessons}</h4>
                <p>Lessons Completed</p>
            </div>
        </div>
        <div class="metric-item">
            <i class="fas fa-question-circle" style="color: #7c3aed;"></i>
            <div>
                <h4>${totalQuizzes}</h4>
                <p>Quizzes Taken</p>
            </div>
        </div>
        <div class="metric-item">
            <i class="fas fa-file-alt" style="color: #10b981;"></i>
            <div>
                <h4>${totalContent}</h4>
                <p>Content Items</p>
            </div>
        </div>
        <div class="metric-item">
            <i class="fas fa-check-circle" style="color: #10b981;"></i>
            <div>
                <h4>Active</h4>
                <p>System Status</p>
            </div>
        </div>
    `;
}

function loadUserManagement() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const container = document.getElementById('userManagement');
    
    if (users.length === 0) {
        container.innerHTML = `
            <div class="student-item">
                <i class="fas fa-info-circle" style="color: #2563eb;"></i>
                <div>
                    <strong>No Users Yet</strong>
                    <p>Users will appear here once they register</p>
                </div>
            </div>
        `;
        return;
    }
    
    const userList = users.slice(0, 5).map(user => {
        const roleColors = {
            student: '#2563eb',
            teacher: '#10b981',
            admin: '#f59e0b'
        };
        const roleIcons = {
            student: 'fa-user-graduate',
            teacher: 'fa-chalkboard-teacher',
            admin: 'fa-user-shield'
        };
        
        return `
            <div class="student-item">
                <i class="fas ${roleIcons[user.role]}" style="color: ${roleColors[user.role]}; font-size: 1.5rem;"></i>
                <div style="flex: 1;">
                    <strong>${user.firstName} ${user.lastName}</strong>
                    <p style="margin: 0; color: #64748b;">${user.email} - ${user.role}</p>
                </div>
                <span class="role-badge" style="background: ${roleColors[user.role]}; padding: 5px 10px; border-radius: 20px; font-size: 12px; color: white;">
                    ${user.role.toUpperCase()}
                </span>
            </div>
        `;
    }).join('');
    
    container.innerHTML = userList;
}
