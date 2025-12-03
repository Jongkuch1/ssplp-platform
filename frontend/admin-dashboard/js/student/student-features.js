// Student Dashboard Features - FR02, FR06, FR12
const StudentFeatures = {
    // FR02: Adaptive Learning Engine
    getRecommendations() {
        const progress = JSON.parse(localStorage.getItem('studentProgress') || '{}');
        const weakSubjects = Object.entries(progress)
            .filter(([_, score]) => score < 60)
            .map(([subject]) => subject);
        
        return weakSubjects.length ? weakSubjects : ['Mathematics', 'English'];
    },

    calculateProgress() {
        const attempts = JSON.parse(localStorage.getItem('quizAttempts') || '[]');
        const total = attempts.length;
        const passed = attempts.filter(a => a.score >= 60).length;
        return total ? Math.round((passed / total) * 100) : 0;
    },

    // FR04: Offline Download Manager
    downloadContent(subjectId, content) {
        const downloads = JSON.parse(localStorage.getItem('downloadedAssets') || '[]');
        downloads.push({
            id: Date.now(),
            subjectId,
            content,
            downloadedAt: Date.now(),
            status: 'completed'
        });
        localStorage.setItem('downloadedAssets', JSON.stringify(downloads));
        Universal.showToast('Content downloaded for offline use', 'success');
    },

    getDownloadedContent() {
        return JSON.parse(localStorage.getItem('downloadedAssets') || '[]');
    },

    // FR12: Quiz Player with Offline Support
    startQuiz(quizId) {
        const quiz = this.getQuiz(quizId);
        localStorage.setItem('currentQuiz', JSON.stringify({
            quizId,
            startTime: Date.now(),
            answers: {},
            offline: !navigator.onLine
        }));
        return quiz;
    },

    saveQuizAnswer(questionId, answer) {
        const current = JSON.parse(localStorage.getItem('currentQuiz') || '{}');
        current.answers[questionId] = answer;
        current.lastSaved = Date.now();
        localStorage.setItem('currentQuiz', JSON.stringify(current));
    },

    submitQuiz() {
        const current = JSON.parse(localStorage.getItem('currentQuiz') || '{}');
        const quiz = this.getQuiz(current.quizId);
        
        let score = 0;
        Object.entries(current.answers).forEach(([qId, answer]) => {
            const question = quiz.questions.find(q => q.id == qId);
            if (question && question.correct === answer) score++;
        });
        
        const attempt = {
            quizId: current.quizId,
            score: Math.round((score / quiz.questions.length) * 100),
            answers: current.answers,
            timestamp: Date.now(),
            synced: navigator.onLine
        };

        const attempts = JSON.parse(localStorage.getItem('quizAttempts') || '[]');
        attempts.push(attempt);
        localStorage.setItem('quizAttempts', JSON.stringify(attempts));

        if (!navigator.onLine) {
            Universal.queueOfflineActivity('quiz_submit', attempt);
        }

        localStorage.removeItem('currentQuiz');
        return attempt;
    },

    getQuiz(quizId) {
        const quizzes = {
            math1: {
                id: 'math1',
                title: 'Algebra Basics',
                subject: 'Mathematics',
                questions: [
                    { id: 1, text: 'What is 2 + 2?', options: ['3', '4', '5', '6'], correct: 1 },
                    { id: 2, text: 'Solve: x + 5 = 10', options: ['3', '5', '7', '10'], correct: 1 }
                ]
            }
        };
        return quizzes[quizId] || quizzes.math1;
    },

    // FR05: Tutoring Booking
    bookTutoring(tutorId, datetime, type) {
        const booking = {
            id: Date.now(),
            tutorId,
            datetime,
            type,
            status: 'pending',
            meetLink: 'https://meet.google.com/zce-wnss-vvr'
        };

        const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        bookings.push(booking);
        localStorage.setItem('bookings', JSON.stringify(bookings));

        Universal.showToast('Tutoring session booked', 'success');
        return booking;
    },

    getUpcomingSessions() {
        const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        return bookings.filter(b => new Date(b.datetime) > new Date());
    },

    // FR11: Student-Tutor Messaging
    sendMessage(recipientId, message) {
        const messages = JSON.parse(localStorage.getItem('messages') || '[]');
        const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
        
        messages.push({
            id: Date.now(),
            from: user.email,
            to: recipientId,
            message,
            timestamp: Date.now(),
            read: false
        });

        localStorage.setItem('messages', JSON.stringify(messages));
        
        if (!navigator.onLine) {
            Universal.queueOfflineActivity('send_message', { recipientId, message });
        }
    },

    getUnreadMessages() {
        const messages = JSON.parse(localStorage.getItem('messages') || '[]');
        const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
        return messages.filter(m => m.to === user.email && !m.read);
    }
};

// FR06: Progress Tracking
const ProgressTracker = {
    updateProgress(subject, score) {
        const progress = JSON.parse(localStorage.getItem('studentProgress') || '{}');
        progress[subject] = score;
        localStorage.setItem('studentProgress', JSON.stringify(progress));
        Universal.logActivity('progress_update', { subject, score });
    },

    getProgressData() {
        const progress = JSON.parse(localStorage.getItem('studentProgress') || '{}');
        const attempts = JSON.parse(localStorage.getItem('quizAttempts') || '[]');
        
        return {
            overall: StudentFeatures.calculateProgress(),
            subjects: progress,
            recentAttempts: attempts.slice(-5),
            timeSpent: this.calculateTimeSpent()
        };
    },

    calculateTimeSpent() {
        const logs = JSON.parse(localStorage.getItem('activityLogs') || '[]');
        const today = new Date().setHours(0,0,0,0);
        const todayLogs = logs.filter(l => l.timestamp >= today);
        return todayLogs.length * 5; // Estimate 5 min per activity
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('student-dashboard')) {
        loadStudentDashboard();
    }
});

function loadStudentDashboard() {
    const recommendations = StudentFeatures.getRecommendations();
    const progress = ProgressTracker.getProgressData();
    const upcoming = StudentFeatures.getUpcomingSessions();
    
    // Update dashboard UI
    document.getElementById('overallProgress').textContent = progress.overall + '%';
    document.getElementById('timeSpent').textContent = progress.timeSpent + ' min';
    
    // Recommendations
    const recContainer = document.getElementById('recommendations');
    if (recContainer) {
        const continueText = t('continueLearningSuggestion');
        const startText = t('start');
        recContainer.innerHTML = recommendations.map(subject => {
            const subjectName = t(subject.toLowerCase()) || subject;
            return `
                <div class="rec-card">
                    <h4>${subjectName}</h4>
                    <p>${continueText}</p>
                    <a href="subjects.html?subject=${subject}" class="btn-small">${startText}</a>
                </div>
            `;
        }).join('');
    }

    // Upcoming sessions
    const sessionsContainer = document.getElementById('upcomingSessions');
    if (sessionsContainer) {
        sessionsContainer.innerHTML = upcoming.length ? upcoming.map(s => `
            <div class="session-card">
                <div>
                    <strong>${s.tutorName || 'Tutor'}</strong>
                    <p>${new Date(s.datetime).toLocaleString()}</p>
                    <small>${s.type} session</small>
                </div>
                <a href="${s.meetLink}" class="btn-small" target="_blank">Join</a>
            </div>
        `).join('') : '<p>No upcoming sessions</p>';
    }
}
