// Performance Report Generator
class ReportGenerator {
    generateStudentReport(studentEmail) {
        const user = JSON.parse(localStorage.getItem('users') || '[]')
            .find(u => u.email === studentEmail);
        const progress = JSON.parse(localStorage.getItem('studentProgress') || '{}')[studentEmail] || {};
        
        const avgScore = progress.quizzesTaken > 0 
            ? Math.round(progress.totalScore / progress.quizzesTaken) 
            : 0;
        
        const reportData = {
            studentName: user?.name || 'Student',
            email: studentEmail,
            reportDate: new Date().toLocaleDateString(),
            lessonsCompleted: progress.lessonsCompleted || 0,
            quizzesTaken: progress.quizzesTaken || 0,
            averageScore: avgScore,
            grade: user?.grade || 'N/A',
            performance: avgScore >= 70 ? 'Excellent' : avgScore >= 50 ? 'Good' : 'Needs Improvement'
        };
        
        return reportData;
    }

    downloadReport(studentEmail, format = 'json') {
        const report = this.generateStudentReport(studentEmail);
        
        if (format === 'json') {
            const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `report-${studentEmail}-${Date.now()}.json`;
            a.click();
        } else if (format === 'html') {
            const html = this.generateHTMLReport(report);
            const blob = new Blob([html], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `report-${studentEmail}-${Date.now()}.html`;
            a.click();
        }
    }

    generateHTMLReport(data) {
        return `
<!DOCTYPE html>
<html>
<head>
    <title>Performance Report - ${data.studentName}</title>
    <style>
        body { font-family: Arial; padding: 40px; }
        .header { text-align: center; border-bottom: 3px solid #2563eb; padding-bottom: 20px; }
        .section { margin: 30px 0; }
        .metric { display: flex; justify-content: space-between; padding: 10px; border-bottom: 1px solid #e5e7eb; }
        .metric strong { color: #1e293b; }
        .performance { padding: 20px; background: #f0f9ff; border-left: 4px solid #2563eb; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="header">
        <h1>SSPLP Performance Report</h1>
        <p>Student: ${data.studentName}</p>
        <p>Date: ${data.reportDate}</p>
    </div>
    
    <div class="section">
        <h2>Academic Performance</h2>
        <div class="metric"><strong>Lessons Completed:</strong> <span>${data.lessonsCompleted}</span></div>
        <div class="metric"><strong>Quizzes Taken:</strong> <span>${data.quizzesTaken}</span></div>
        <div class="metric"><strong>Average Score:</strong> <span>${data.averageScore}%</span></div>
        <div class="metric"><strong>Grade Level:</strong> <span>${data.grade}</span></div>
    </div>
    
    <div class="performance">
        <h3>Overall Performance: ${data.performance}</h3>
        <p>Keep up the great work and continue learning!</p>
    </div>
</body>
</html>`;
    }
}

window.ReportGenerator = new ReportGenerator();
