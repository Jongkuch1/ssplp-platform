// FR02: Adaptive Learning Engine
// Adjusts content difficulty based on student performance

class AdaptiveLearningEngine {
    constructor() {
        this.performanceThresholds = {
            easy: 0.8,      // 80%+ correct -> increase difficulty
            medium: 0.5,    // 50-80% correct -> maintain level
            hard: 0.5       // <50% correct -> decrease difficulty
        };
    }

    // Calculate student performance level
    calculatePerformance(quizResults) {
        if (!quizResults || quizResults.length === 0) return 0.5;
        
        const recentResults = quizResults.slice(-5); // Last 5 quizzes
        const totalScore = recentResults.reduce((sum, result) => sum + result.score, 0);
        const avgScore = totalScore / recentResults.length / 100;
        
        return avgScore;
    }

    // Determine difficulty level
    getDifficultyLevel(performance) {
        if (performance >= this.performanceThresholds.easy) {
            return 'advanced';
        } else if (performance >= this.performanceThresholds.medium) {
            return 'intermediate';
        } else {
            return 'beginner';
        }
    }

    // Get recommended content
    getRecommendedContent(subject, currentLevel, performance) {
        const difficulty = this.getDifficultyLevel(performance);
        
        return {
            difficulty: difficulty,
            subject: subject,
            recommendation: this.getContentRecommendation(difficulty),
            nextSteps: this.getNextSteps(difficulty, performance)
        };
    }

    getContentRecommendation(difficulty) {
        const recommendations = {
            beginner: 'Focus on foundational concepts with more examples and practice',
            intermediate: 'Continue with current pace, mix of theory and practice',
            advanced: 'Challenge yourself with advanced topics and complex problems'
        };
        return recommendations[difficulty];
    }

    getNextSteps(difficulty, performance) {
        if (difficulty === 'beginner') {
            return ['Review basic concepts', 'Practice fundamental exercises', 'Watch tutorial videos'];
        } else if (difficulty === 'intermediate') {
            return ['Continue current lessons', 'Take practice quizzes', 'Explore related topics'];
        } else {
            return ['Tackle advanced problems', 'Explore enrichment materials', 'Help peers'];
        }
    }

    // Adjust quiz difficulty
    adjustQuizDifficulty(studentId, subject) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const student = users.find(u => u.id === studentId);
        
        if (!student || !student.quizResults) return 'intermediate';
        
        const subjectResults = student.quizResults.filter(r => r.subject === subject);
        const performance = this.calculatePerformance(subjectResults);
        
        return this.getDifficultyLevel(performance);
    }

    // Save adaptive learning data
    saveAdaptiveData(studentId, subject, performance) {
        const adaptiveData = JSON.parse(localStorage.getItem('adaptiveData') || '{}');
        
        if (!adaptiveData[studentId]) {
            adaptiveData[studentId] = {};
        }
        
        adaptiveData[studentId][subject] = {
            performance: performance,
            difficulty: this.getDifficultyLevel(performance),
            lastUpdated: new Date().toISOString()
        };
        
        localStorage.setItem('adaptiveData', JSON.stringify(adaptiveData));
    }

    // Get student's adaptive profile
    getAdaptiveProfile(studentId) {
        const adaptiveData = JSON.parse(localStorage.getItem('adaptiveData') || '{}');
        return adaptiveData[studentId] || {};
    }
}

// Initialize adaptive engine
const adaptiveEngine = new AdaptiveLearningEngine();
