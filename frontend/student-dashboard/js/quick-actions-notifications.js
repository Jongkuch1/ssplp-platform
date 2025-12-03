// Quick Actions Notification Badges
document.addEventListener('DOMContentLoaded', function() {
    function updateQuickActionBadges() {
        // Check for new quizzes
        const quizzes = JSON.parse(localStorage.getItem('availableQuizzes') || '[]');
        const completedQuizzes = JSON.parse(localStorage.getItem('completedQuizzes') || '[]');
        const newQuizzes = quizzes.length - completedQuizzes.length;
        
        if (newQuizzes > 0) {
            const badge = document.getElementById('quizzesBadge');
            if (badge) {
                badge.textContent = newQuizzes + ' New';
                badge.style.display = 'block';
            }
        }

        // Check for unread messages
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            const messages = JSON.parse(localStorage.getItem('messages') || '[]');
            const unreadMessages = messages.filter(m => 
                m.receiverId === currentUser.id && !m.read
            ).length;
            
            if (unreadMessages > 0) {
                const badge = document.getElementById('helpBadge');
                if (badge) {
                    badge.textContent = unreadMessages;
                    badge.style.display = 'block';
                }
            }
        }

        // Check for progress updates
        const studentProgress = JSON.parse(localStorage.getItem('studentProgress') || '{}');
        if (currentUser && studentProgress[currentUser.email]) {
            const progress = studentProgress[currentUser.email];
            if (progress.quizzesTaken > 0) {
                const badge = document.getElementById('progressBadge');
                if (badge) {
                    badge.textContent = 'Updated';
                    badge.style.display = 'block';
                }
            }
        }

        // Check for new subjects
        const subjects = JSON.parse(localStorage.getItem('subjects') || '[]');
        if (subjects.length > 0) {
            const badge = document.getElementById('subjectsBadge');
            if (badge) {
                badge.textContent = subjects.length + ' Available';
                badge.style.display = 'block';
            }
        }
    }

    // Update badges immediately
    updateQuickActionBadges();

    // Update every 5 seconds
    setInterval(updateQuickActionBadges, 5000);
});
