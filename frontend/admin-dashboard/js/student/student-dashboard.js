// Student Dashboard Logic
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (!currentUser.email) {
        window.location.href = 'login.html';
        return;
    }

    // Load student data
    loadStudentData();
    loadSubjects();
    loadRecentActivity();
    loadAdaptiveRecommendations();
});

function loadAdaptiveRecommendations() {
    if (typeof adaptiveEngine === 'undefined') return;
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const adaptiveProfile = adaptiveEngine.getAdaptiveProfile(currentUser.id);
    
    const container = document.getElementById('adaptiveRecommendations');
    if (!container) return;
    
    if (Object.keys(adaptiveProfile).length === 0) {
        container.innerHTML = `
            <div class="info-item">
                <i class="fas fa-info-circle"></i>
                <p>Complete some quizzes to get personalized recommendations</p>
            </div>
        `;
        return;
    }
    
    let html = '<h3>Personalized Learning Path</h3>';
    Object.entries(adaptiveProfile).forEach(([subject, data]) => {
        const recommendation = adaptiveEngine.getRecommendedContent(subject, data.difficulty, data.performance);
        html += `
            <div class="recommendation-item">
                <strong>${subject}</strong>
                <p>Level: ${data.difficulty}</p>
                <p>${recommendation.recommendation}</p>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function loadStudentData() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    // Update welcome message
    document.getElementById('studentName').textContent = currentUser.firstName || 'Student';
    
    // Get or initialize student progress
    let studentProgress = JSON.parse(localStorage.getItem('studentProgress') || '{}');
    if (!studentProgress[currentUser.email]) {
        studentProgress[currentUser.email] = {
            lessonsCompleted: 0,
            quizzesTaken: 0,
            totalScore: 0,
            subjects: []
        };
        localStorage.setItem('studentProgress', JSON.stringify(studentProgress));
    }
    
    const progress = studentProgress[currentUser.email];
    
    // Update stats
    document.getElementById('completedLessons').textContent = progress.lessonsCompleted || 0;
    document.getElementById('quizzesTaken').textContent = progress.quizzesTaken || 0;
    
    const avgScore = progress.quizzesTaken > 0 
        ? Math.round(progress.totalScore / progress.quizzesTaken) 
        : 0;
    document.getElementById('averageScore').textContent = avgScore + '%';
    document.getElementById('currentGrade').textContent = currentUser.grade ? 'Grade ' + currentUser.grade : 'Grade 9';
}

function loadSubjects() {
    const subjects = [
        { name: 'Mathematics', icon: 'fa-calculator', color: '#2563eb', lessons: 24 },
        { name: 'English', icon: 'fa-book-open', color: '#7c3aed', lessons: 20 },
        { name: 'Physics', icon: 'fa-atom', color: '#10b981', lessons: 18 },
        { name: 'Chemistry', icon: 'fa-flask', color: '#f59e0b', lessons: 16 },
        { name: 'Biology', icon: 'fa-dna', color: '#ef4444', lessons: 22 }
    ];
    
    const container = document.getElementById('availableSubjects');
    container.innerHTML = subjects.map(subject => `
        <div class="subject-item" onclick="window.location.href='subjects.html'">
            <i class="fas ${subject.icon}" style="color: ${subject.color}"></i>
            <div>
                <strong>${subject.name}</strong>
                <p>${subject.lessons} lessons available</p>
            </div>
            <i class="fas fa-chevron-right" style="color: #94a3b8;"></i>
        </div>
    `).join('');
}

function loadRecentActivity() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const studentProgress = JSON.parse(localStorage.getItem('studentProgress') || '{}');
    const progress = studentProgress[currentUser.email] || {};
    
    const container = document.getElementById('recentActivity');
    
    if (!progress.quizzesTaken && !progress.lessonsCompleted) {
        container.innerHTML = `
            <div class="activity-item">
                <i class="fas fa-info-circle" style="color: #2563eb;"></i>
                <div>
                    <strong>Welcome to SSPLP!</strong>
                    <p>Start by exploring subjects and taking your first lesson</p>
                </div>
            </div>
            <div class="activity-item">
                <i class="fas fa-lightbulb" style="color: #f59e0b;"></i>
                <div>
                    <strong>Tip</strong>
                    <p>Complete quizzes to track your progress and earn achievements</p>
                </div>
            </div>
        `;
    } else {
        container.innerHTML = `
            <div class="activity-item">
                <i class="fas fa-check-circle" style="color: #10b981;"></i>
                <div>
                    <strong>Lessons Completed</strong>
                    <p>You've completed ${progress.lessonsCompleted || 0} lessons</p>
                </div>
            </div>
            <div class="activity-item">
                <i class="fas fa-trophy" style="color: #f59e0b;"></i>
                <div>
                    <strong>Quizzes Taken</strong>
                    <p>You've taken ${progress.quizzesTaken || 0} quizzes</p>
                </div>
            </div>
        `;
    }
}
