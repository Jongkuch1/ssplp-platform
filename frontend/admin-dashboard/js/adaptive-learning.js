// Adaptive Learning Engine
class AdaptiveLearning {
    constructor() {
        this.difficultyLevels = ['beginner', 'intermediate', 'advanced'];
    }

    // Analyze student performance and adjust difficulty
    adjustDifficulty(studentEmail) {
        const progress = JSON.parse(localStorage.getItem('studentProgress') || '{}');
        const studentData = progress[studentEmail];
        
        if (!studentData || studentData.quizzesTaken < 3) {
            return 'beginner'; // Start with beginner
        }

        const avgScore = studentData.totalScore / studentData.quizzesTaken;
        
        // Adaptive logic
        if (avgScore >= 80) return 'advanced';
        if (avgScore >= 60) return 'intermediate';
        return 'beginner';
    }

    // Get personalized recommendations
    getRecommendations(studentEmail) {
        const progress = JSON.parse(localStorage.getItem('studentProgress') || '{}');
        const studentData = progress[studentEmail] || {};
        const difficulty = this.adjustDifficulty(studentEmail);
        
        const recommendations = [];
        
        // Recommend based on weak areas
        if (studentData.quizzesTaken > 0) {
            const avgScore = studentData.totalScore / studentData.quizzesTaken;
            
            if (avgScore < 70) {
                recommendations.push({
                    type: 'practice',
                    message: 'Practice more quizzes to improve your score',
                    action: 'Take Quiz',
                    link: 'quizzes.html'
                });
            }
            
            if (studentData.lessonsCompleted < 10) {
                recommendations.push({
                    type: 'lesson',
                    message: 'Complete more lessons to unlock advanced content',
                    action: 'Browse Subjects',
                    link: 'subjects.html'
                });
            }
        } else {
            recommendations.push({
                type: 'start',
                message: 'Start your learning journey with beginner lessons',
                action: 'Get Started',
                link: 'subjects.html'
            });
        }
        
        return { difficulty, recommendations };
    }

    // Track learning patterns
    trackLearningPattern(studentEmail, activity) {
        const patterns = JSON.parse(localStorage.getItem('learningPatterns') || '{}');
        
        if (!patterns[studentEmail]) {
            patterns[studentEmail] = {
                activities: [],
                preferredTime: null,
                averageSessionLength: 0
            };
        }
        
        patterns[studentEmail].activities.push({
            ...activity,
            timestamp: Date.now()
        });
        
        localStorage.setItem('learningPatterns', JSON.stringify(patterns));
    }
}

window.AdaptiveLearning = new AdaptiveLearning();
