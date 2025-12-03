// Quiz System Logic
document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (!currentUser.email) {
        window.location.href = 'login.html';
        return;
    }

    if (currentUser.role === 'student') {
        document.getElementById('studentView').style.display = 'block';
        loadQuizzesForStudent();
    } else if (currentUser.role === 'teacher' || currentUser.role === 'admin') {
        document.getElementById('teacherView').style.display = 'block';
        loadSubjects();
        loadMyQuizzes();
        document.getElementById('createQuizForm').addEventListener('submit', createQuiz);
    }
});

function loadSubjects() {
    const subjects = [
        'Mathematics', 'English', 'Physics', 'Chemistry', 'Biology',
        'Agriculture', 'Additional Mathematics', 'ICT', 'History',
        'Geography', 'Commerce', 'Accounting', 'Literature', 'CRE', 'Citizenship'
    ];
    
    const select = document.getElementById('quizSubject');
    select.innerHTML = '<option value="">Select Subject</option>' + 
        subjects.map(s => `<option value="${s}">${s}</option>`).join('');
}

function createQuiz(e) {
    e.preventDefault();
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const quiz = {
        id: Date.now(),
        subject: document.getElementById('quizSubject').value,
        title: document.getElementById('quizTitle').value,
        questionCount: document.getElementById('questionCount').value,
        createdBy: currentUser.email,
        createdDate: new Date().toISOString()
    };
    
    let allQuizzes = JSON.parse(localStorage.getItem('platformQuizzes') || '[]');
    allQuizzes.push(quiz);
    localStorage.setItem('platformQuizzes', JSON.stringify(allQuizzes));
    
    // Update teacher stats
    let teacherData = JSON.parse(localStorage.getItem('teacherData') || '{}');
    if (!teacherData[currentUser.email]) {
        teacherData[currentUser.email] = { contentCreated: 0, quizzesCreated: 0 };
    }
    teacherData[currentUser.email].quizzesCreated++;
    localStorage.setItem('teacherData', JSON.stringify(teacherData));
    
    alert('Quiz created successfully!');
    e.target.reset();
    loadMyQuizzes();
}

function loadMyQuizzes() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const allQuizzes = JSON.parse(localStorage.getItem('platformQuizzes') || '[]');
    const myQuizzes = allQuizzes.filter(q => q.createdBy === currentUser.email);
    
    const container = document.getElementById('myQuizzes');
    
    if (myQuizzes.length === 0) {
        container.innerHTML = '<p style="color: #64748b;">No quizzes created yet</p>';
        return;
    }
    
    container.innerHTML = myQuizzes.map(quiz => `
        <div class="quiz-item">
            <div>
                <strong>${quiz.title}</strong>
                <p style="margin: 5px 0; color: #64748b;">${quiz.subject} - ${quiz.questionCount} questions</p>
                <small>${new Date(quiz.createdDate).toLocaleDateString()}</small>
            </div>
        </div>
    `).join('');
}

function loadQuizzesForStudent() {
    const allQuizzes = JSON.parse(localStorage.getItem('platformQuizzes') || '[]');
    const container = document.getElementById('quizList');
    
    if (allQuizzes.length === 0) {
        container.innerHTML = `
            <div class="quiz-item">
                <i class="fas fa-info-circle" style="color: #2563eb; font-size: 2rem;"></i>
                <div>
                    <strong>No Quizzes Available</strong>
                    <p>Check back later for new assessments</p>
                </div>
            </div>
        `;
        return;
    }
    
    container.innerHTML = allQuizzes.map(quiz => `
        <div class="quiz-item" onclick="takeQuiz(${quiz.id})">
            <i class="fas fa-clipboard-list" style="color: #2563eb; font-size: 2rem;"></i>
            <div style="flex: 1;">
                <strong>${quiz.title}</strong>
                <p style="margin: 5px 0; color: #64748b;">${quiz.subject} - ${quiz.questionCount} questions</p>
            </div>
            <button class="btn btn-primary">Start Quiz</button>
        </div>
    `).join('');
}

function takeQuiz(quizId) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    // Simulate quiz completion
    const score = Math.floor(Math.random() * 40) + 60; // 60-100%
    
    let studentProgress = JSON.parse(localStorage.getItem('studentProgress') || '{}');
    if (!studentProgress[currentUser.email]) {
        studentProgress[currentUser.email] = {
            lessonsCompleted: 0,
            quizzesTaken: 0,
            totalScore: 0
        };
    }
    
    studentProgress[currentUser.email].quizzesTaken++;
    studentProgress[currentUser.email].totalScore += score;
    localStorage.setItem('studentProgress', JSON.stringify(studentProgress));
    
    alert(`Quiz completed! Your score: ${score}%`);
    window.location.href = 'progress.html';
}
