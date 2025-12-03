// FR07: Performance Reports Generator
// Generates monthly and termly performance reports

class ReportsGenerator {
    constructor() {
        this.reportTypes = ['monthly', 'termly', 'annual'];
    }

    // Generate student performance report
    generateStudentReport(studentId, reportType = 'monthly') {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const student = users.find(u => u.id === studentId);
        
        if (!student) return null;
        
        const dateRange = this.getDateRange(reportType);
        const quizResults = this.getQuizResultsInRange(student, dateRange);
        const progressData = this.getProgressData(student, dateRange);
        
        return {
            studentInfo: {
                name: `${student.firstName} ${student.lastName}`,
                email: student.email,
                grade: student.grade
            },
            reportPeriod: {
                type: reportType,
                startDate: dateRange.start,
                endDate: dateRange.end
            },
            performance: {
                overallScore: this.calculateOverallScore(quizResults),
                subjectScores: this.calculateSubjectScores(quizResults),
                quizzesTaken: quizResults.length,
                averageScore: this.calculateAverageScore(quizResults)
            },
            progress: {
                lessonsCompleted: progressData.lessonsCompleted,
                timeSpent: progressData.timeSpent,
                improvementRate: this.calculateImprovement(quizResults)
            },
            strengths: this.identifyStrengths(quizResults),
            areasForImprovement: this.identifyWeaknesses(quizResults),
            recommendations: this.generateRecommendations(quizResults),
            generatedDate: new Date().toISOString()
        };
    }

    // Get date range for report type
    getDateRange(reportType) {
        const now = new Date();
        let start = new Date();
        
        if (reportType === 'monthly') {
            start.setMonth(now.getMonth() - 1);
        } else if (reportType === 'termly') {
            start.setMonth(now.getMonth() - 3);
        } else if (reportType === 'annual') {
            start.setFullYear(now.getFullYear() - 1);
        }
        
        return { start: start.toISOString(), end: now.toISOString() };
    }

    // Filter quiz results by date range
    getQuizResultsInRange(student, dateRange) {
        if (!student.quizResults) return [];
        
        return student.quizResults.filter(result => {
            const resultDate = new Date(result.date || result.timestamp);
            return resultDate >= new Date(dateRange.start) && resultDate <= new Date(dateRange.end);
        });
    }

    // Get progress data
    getProgressData(student, dateRange) {
        const progress = student.progress || {};
        return {
            lessonsCompleted: Object.keys(progress).length,
            timeSpent: this.calculateTimeSpent(progress)
        };
    }

    // Calculate overall score
    calculateOverallScore(quizResults) {
        if (quizResults.length === 0) return 0;
        const total = quizResults.reduce((sum, r) => sum + r.score, 0);
        return Math.round(total / quizResults.length);
    }

    // Calculate subject-wise scores
    calculateSubjectScores(quizResults) {
        const subjectScores = {};
        
        quizResults.forEach(result => {
            if (!subjectScores[result.subject]) {
                subjectScores[result.subject] = { total: 0, count: 0 };
            }
            subjectScores[result.subject].total += result.score;
            subjectScores[result.subject].count += 1;
        });
        
        Object.keys(subjectScores).forEach(subject => {
            const data = subjectScores[subject];
            subjectScores[subject] = Math.round(data.total / data.count);
        });
        
        return subjectScores;
    }

    // Calculate average score
    calculateAverageScore(quizResults) {
        return this.calculateOverallScore(quizResults);
    }

    // Calculate time spent
    calculateTimeSpent(progress) {
        let totalMinutes = 0;
        Object.values(progress).forEach(p => {
            totalMinutes += p.timeSpent || 0;
        });
        return `${Math.round(totalMinutes / 60)} hours`;
    }

    // Calculate improvement rate
    calculateImprovement(quizResults) {
        if (quizResults.length < 2) return 0;
        
        const firstHalf = quizResults.slice(0, Math.floor(quizResults.length / 2));
        const secondHalf = quizResults.slice(Math.floor(quizResults.length / 2));
        
        const firstAvg = this.calculateOverallScore(firstHalf);
        const secondAvg = this.calculateOverallScore(secondHalf);
        
        return Math.round(((secondAvg - firstAvg) / firstAvg) * 100);
    }

    // Identify strengths
    identifyStrengths(quizResults) {
        const subjectScores = this.calculateSubjectScores(quizResults);
        return Object.entries(subjectScores)
            .filter(([_, score]) => score >= 75)
            .map(([subject, score]) => ({ subject, score }))
            .sort((a, b) => b.score - a.score)
            .slice(0, 3);
    }

    // Identify weaknesses
    identifyWeaknesses(quizResults) {
        const subjectScores = this.calculateSubjectScores(quizResults);
        return Object.entries(subjectScores)
            .filter(([_, score]) => score < 60)
            .map(([subject, score]) => ({ subject, score }))
            .sort((a, b) => a.score - b.score)
            .slice(0, 3);
    }

    // Generate recommendations
    generateRecommendations(quizResults) {
        const weaknesses = this.identifyWeaknesses(quizResults);
        const recommendations = [];
        
        if (weaknesses.length > 0) {
            weaknesses.forEach(w => {
                recommendations.push(`Focus more on ${w.subject} - consider extra tutoring sessions`);
            });
        } else {
            recommendations.push('Excellent performance! Continue with current study habits');
        }
        
        return recommendations;
    }

    // Export report as downloadable format
    exportReport(report, format = 'json') {
        if (format === 'json') {
            return JSON.stringify(report, null, 2);
        } else if (format === 'text') {
            return this.formatReportAsText(report);
        }
    }

    // Format report as readable text
    formatReportAsText(report) {
        return `
PERFORMANCE REPORT
==================
Student: ${report.studentInfo.name}
Grade: ${report.studentInfo.grade}
Period: ${report.reportPeriod.type}
Date: ${new Date(report.generatedDate).toLocaleDateString()}

PERFORMANCE SUMMARY
-------------------
Overall Score: ${report.performance.overallScore}%
Quizzes Taken: ${report.performance.quizzesTaken}
Average Score: ${report.performance.averageScore}%
Improvement Rate: ${report.progress.improvementRate}%

SUBJECT SCORES
--------------
${Object.entries(report.performance.subjectScores).map(([subject, score]) => 
    `${subject}: ${score}%`).join('\n')}

STRENGTHS
---------
${report.strengths.map(s => `- ${s.subject} (${s.score}%)`).join('\n')}

AREAS FOR IMPROVEMENT
---------------------
${report.areasForImprovement.map(w => `- ${w.subject} (${w.score}%)`).join('\n')}

RECOMMENDATIONS
---------------
${report.recommendations.map(r => `- ${r}`).join('\n')}
        `;
    }
}

// Initialize reports generator
const reportsGenerator = new ReportsGenerator();
