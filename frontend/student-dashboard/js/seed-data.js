// Seed realistic data for all dashboards
async function seedData() {
    // Use data sync system to fetch real data from backend
    if (window.dataSync) {
        await window.dataSync.syncAllData();
    }
    
    // Fallback: seed default users only if none exist and no backend
    if (!localStorage.getItem('users')) {
        const users = [
            { id: 1, name: 'John Doe', email: 'student@ssplp.org', password: 'student123', role: 'student', grade: 10, status: 'active', createdAt: Date.now() - 86400000 * 30, lastActive: Date.now() - 86400000 * 1 },
            { id: 2, name: 'Jane Smith', email: 'student2@ssplp.org', password: 'pass123', role: 'student', grade: 11, status: 'active', createdAt: Date.now() - 86400000 * 25, lastActive: Date.now() - 86400000 * 2 },
            { id: 3, name: 'Sarah Williams', email: 'teacher@ssplp.org', password: 'teacher123', role: 'teacher', status: 'active', createdAt: Date.now() - 86400000 * 60 },
            { id: 4, name: 'Admin User', email: 'admin@ssplp.org', password: 'admin123', role: 'admin', status: 'active', createdAt: Date.now() - 86400000 * 90 }
        ];
        localStorage.setItem('users', JSON.stringify(users));
    }
    
    // Check if already seeded other data
    if (localStorage.getItem('dataSeeded')) return;

    // Quiz attempts for the 2 students only
    const quizAttempts = [
        { id: 1, studentId: 1, subject: 'Mathematics', score: 85, completedAt: Date.now() - 86400000 * 5 },
        { id: 2, studentId: 1, subject: 'Physics', score: 78, completedAt: Date.now() - 86400000 * 3 },
        { id: 3, studentId: 1, subject: 'Chemistry', score: 90, completedAt: Date.now() - 86400000 * 1 },
        { id: 4, studentId: 2, subject: 'Mathematics', score: 92, completedAt: Date.now() - 86400000 * 4 },
        { id: 5, studentId: 2, subject: 'English', score: 88, completedAt: Date.now() - 86400000 * 2 },
        { id: 6, studentId: 2, subject: 'Biology', score: 95, completedAt: Date.now() - 86400000 * 1 }
    ];
    localStorage.setItem('quizAttempts', JSON.stringify(quizAttempts));
    localStorage.setItem('studentProgress', JSON.stringify({}));
    localStorage.setItem('courses', JSON.stringify([]));
    localStorage.setItem('assignments', JSON.stringify([]));
    localStorage.setItem('submissions', JSON.stringify([]));
    
    // Add sample resources for key subjects
    const resources = [
        { id: 1, subject: 'Mathematics', title: 'Algebra Basics', type: 'PDF', url: '#', uploadedBy: 3, uploadedAt: Date.now() - 86400000 * 10, downloads: 15 },
        { id: 2, subject: 'Mathematics', title: 'Geometry Guide', type: 'PDF', url: '#', uploadedBy: 3, uploadedAt: Date.now() - 86400000 * 8, downloads: 12 },
        { id: 3, subject: 'English', title: 'Grammar Essentials', type: 'PDF', url: '#', uploadedBy: 3, uploadedAt: Date.now() - 86400000 * 7, downloads: 20 },
        { id: 4, subject: 'English', title: 'Essay Writing Tips', type: 'Document', url: '#', uploadedBy: 3, uploadedAt: Date.now() - 86400000 * 5, downloads: 18 },
        { id: 5, subject: 'Chemistry', title: 'Periodic Table Study', type: 'PDF', url: '#', uploadedBy: 3, uploadedAt: Date.now() - 86400000 * 6, downloads: 10 },
        { id: 6, subject: 'Chemistry', title: 'Chemical Reactions', type: 'Video', url: '#', uploadedBy: 3, uploadedAt: Date.now() - 86400000 * 4, downloads: 8 },
        { id: 7, subject: 'Physics', title: 'Newton Laws of Motion', type: 'PDF', url: '#', uploadedBy: 3, uploadedAt: Date.now() - 86400000 * 3, downloads: 14 },
        { id: 8, subject: 'Physics', title: 'Electricity Basics', type: 'Video', url: '#', uploadedBy: 3, uploadedAt: Date.now() - 86400000 * 2, downloads: 11 }
    ];
    localStorage.setItem('resources', JSON.stringify(resources));
    
    // Track resource access for progress monitoring
    const resourceAccess = [
        { id: 1, studentId: 1, resourceId: 1, accessedAt: Date.now() - 86400000 * 2, timeSpent: 15 },
        { id: 2, studentId: 1, resourceId: 3, accessedAt: Date.now() - 86400000 * 1, timeSpent: 20 },
        { id: 3, studentId: 2, resourceId: 1, accessedAt: Date.now() - 86400000 * 3, timeSpent: 18 },
        { id: 4, studentId: 2, resourceId: 5, accessedAt: Date.now() - 86400000 * 1, timeSpent: 25 }
    ];
    localStorage.setItem('resourceAccess', JSON.stringify(resourceAccess));
    
    localStorage.setItem('bookings', JSON.stringify([]));
    localStorage.setItem('messages', JSON.stringify([]));
    localStorage.setItem('downloadedAssets', JSON.stringify([]));
    localStorage.setItem('activityLogs', JSON.stringify([]));
    localStorage.setItem('auditLogs', JSON.stringify([]));
    localStorage.setItem('notifications', JSON.stringify([]));
    localStorage.setItem('reports', JSON.stringify([]));

    // System Settings (keep defaults)
    const systemSettings = {
        smsProvider: 'twilio',
        emailProvider: 'sendgrid',
        notificationsEnabled: true,
        encryptionEnabled: true,
        maxLoginAttempts: 3,
        sessionTimeout: 3600000
    };
    localStorage.setItem('systemSettings', JSON.stringify(systemSettings));

    localStorage.setItem('dataSeeded', 'true');
    console.log('✅ Data seeded: 2 students, 1 teacher, 1 admin, 6 quiz attempts, 8 resources');
    console.log('Users:', users.map(u => u.name + ' (' + u.role + ')').join(', '));
}

// Run on page load
document.addEventListener('DOMContentLoaded', seedData);
