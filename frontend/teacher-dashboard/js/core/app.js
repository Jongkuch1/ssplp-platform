// Initialize navigation based on user role
function initNavigation() {
    // Attach logout handler to existing button - wait for DOM to be ready
    setTimeout(() => {
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn && !logoutBtn.hasAttribute('data-listener')) {
            logoutBtn.setAttribute('data-listener', 'true');
            logoutBtn.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                handleLogout();
                return false;
            };
        }
    }, 100);
}

function handleLogout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    window.location.href = 'index.html';
}

// Global logout function that works everywhere
window.logout = function() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    window.location.href = 'index.html';
};

// Auto-attach logout to all logout buttons on page load
document.addEventListener('DOMContentLoaded', function() {
    const logoutButtons = document.querySelectorAll('#logoutBtn, .btn-logout, [data-logout]');
    logoutButtons.forEach(btn => {
        if (!btn.hasAttribute('data-logout-attached')) {
            btn.setAttribute('data-logout-attached', 'true');
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                logout();
            });
        }
    });
});

// Call initNavigation on page load for protected pages
const protectedPages = [
    'student-dashboard.html', 'teacher-dashboard.html', 'admin-dashboard.html',
    'subjects.html', 'quizzes.html', 'progress.html', 'profile.html',
    'content-management.html', 'create-quiz.html', 'analytics.html', 'reports.html'
];

const currentPage = window.location.pathname.split('/').pop();
if (protectedPages.includes(currentPage)) {
    initNavigation();
}

// Seed demo users on first load
function seedDemoUsers() {
    const dataSeeded = localStorage.getItem('dataSeeded');
    const forceReseed = localStorage.getItem('forceReseed');
    
    if (!dataSeeded || forceReseed === 'true') {
        const demoUsers = [
            {
                email: 'student@ssplp.org',
                password: 'student123',
                firstName: 'Demo',
                lastName: 'Student',
                role: 'student',
                grade: 'S1'
            },
            {
                email: 'teacher@ssplp.org',
                password: 'teacher123',
                firstName: 'Demo',
                lastName: 'Teacher',
                role: 'teacher'
            },
            {
                email: 'admin@ssplp.org',
                password: 'admin123',
                firstName: 'Demo',
                lastName: 'Admin',
                role: 'admin'
            }
        ];
        
        localStorage.setItem('users', JSON.stringify(demoUsers));
        localStorage.setItem('dataSeeded', 'true');
        localStorage.removeItem('forceReseed');
        console.log('Demo users seeded successfully!');
    }
}

// Seed users immediately
seedDemoUsers();

// Rest of your existing code...
document.addEventListener('DOMContentLoaded', function() {
    // Ensure demo users are seeded
    seedDemoUsers();
    const roleSelect = document.getElementById('role');
    const gradeGroup = document.getElementById('gradeGroup');
    
    if (roleSelect && gradeGroup) {
        roleSelect.addEventListener('change', function() {
            if (this.value === 'student') {
                gradeGroup.style.display = 'block';
            } else {
                gradeGroup.style.display = 'none';
            }
        });
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            try {
                // Try backend login first
                if (window.API) {
                    const response = await API.auth.login({ email, password });
                    localStorage.setItem('token', response.token);
                    localStorage.setItem('currentUser', JSON.stringify(response.user));
                    
                    // Redirect based on role
                    if (response.user.role === 'student') {
                        window.location.href = '../student-dashboard/student-dashboard.html';
                    } else if (response.user.role === 'teacher') {
                        window.location.href = 'teacher-dashboard.html';
                    } else if (response.user.role === 'admin') {
                        window.location.href = '../admin-dashboard/admin-dashboard.html';
                    }
                    return;
                }
            } catch (error) {
                console.warn('Backend unavailable, using offline mode');
            }
            
            // Fallback to LocalStorage
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                
                if (user.role === 'student') {
                    window.location.href = '../student-dashboard/student-dashboard.html';
                } else if (user.role === 'teacher') {
                    window.location.href = 'teacher-dashboard.html';
                } else if (user.role === 'admin') {
                    window.location.href = '../admin-dashboard/admin-dashboard.html';
                }
            } else {
                alert('Invalid credentials. Please check your email and password.');
            }
        });
    }

    if (window.location.pathname.includes('student-dashboard.html')) {
        initializeStudentDashboard();
    } else if (window.location.pathname.includes('teacher-dashboard.html')) {
        initializeTeacherDashboard();
    } else if (window.location.pathname.includes('admin-dashboard.html')) {
        initializeAdminDashboard();
    }
});

function initializeStudentDashboard() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'student') {
        window.location.href = 'login.html';
        return;
    }
    document.getElementById('userName').textContent = currentUser.name;
}

function initializeTeacherDashboard() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'teacher') {
        window.location.href = 'login.html';
        return;
    }
    document.getElementById('teacherName').textContent = currentUser.name;
}

function initializeAdminDashboard() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'admin') {
        window.location.href = 'login.html';
        return;
    }
}

function checkAuth() {
    const currentUser = localStorage.getItem('currentUser');
    if (protectedPages.includes(currentPage) && !currentUser) {
        window.location.href = 'login.html';
    }
}

checkAuth();

// Mobile menu toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
}
