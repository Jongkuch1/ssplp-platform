// Admin Dashboard Features - FR01, FR07, FR09, FR10, FR13, FR14
const AdminFeatures = {
    // FR13: System Health & Usage Overview
    getSystemHealth() {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const logs = JSON.parse(localStorage.getItem('activityLogs') || '[]');
        const resources = JSON.parse(localStorage.getItem('resources') || '[]');
        
        const now = Date.now();
        const dayAgo = now - 86400000;
        const activeUsers = new Set(logs.filter(l => l.timestamp > dayAgo).map(l => l.user)).size;
        
        return {
            totalUsers: users.length,
            activeUsers,
            uptime: 99.9,
            responseTime: Math.random() * 100 + 50,
            storageUsed: this.calculateStorage(),
            pendingApprovals: resources.filter(r => r.status === 'pending_approval').length
        };
    },

    calculateStorage() {
        let total = 0;
        for (let key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                total += localStorage[key].length + key.length;
            }
        }
        return (total / 1024).toFixed(2) + ' KB';
    },

    // FR01: User Management
    createUser(userData) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = {
            id: Date.now(),
            ...userData,
            createdAt: Date.now(),
            status: 'active'
        };
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        this.logAudit('user_created', { userId: user.id, email: user.email });
        Universal.showToast('User created', 'success');
        return user;
    },

    updateUser(userId, updates) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const index = users.findIndex(u => u.id == userId || u.email == userId);
        if (index !== -1) {
            users[index] = { ...users[index], ...updates, updatedAt: Date.now() };
            localStorage.setItem('users', JSON.stringify(users));
            this.logAudit('user_updated', { userId, updates });
            Universal.showToast('User updated', 'success');
        }
    },

    deactivateUser(userId) {
        this.updateUser(userId, { status: 'inactive' });
        this.logAudit('user_deactivated', { userId });
    },

    bulkImportUsers(csvData) {
        const lines = csvData.split('\n').slice(1);
        let imported = 0;
        
        lines.forEach(line => {
            const [name, email, role, grade] = line.split(',');
            if (email && role) {
                this.createUser({ name, email, role, grade });
                imported++;
            }
        });
        
        Universal.showToast(`${imported} users imported`, 'success');
        return imported;
    },

    exportUsers() {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const csv = 'Name,Email,Role,Grade,Status\n' + 
            users.map(u => `${u.name},${u.email},${u.role},${u.grade || ''},${u.status}`).join('\n');
        
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `users_${Date.now()}.csv`;
        a.click();
        
        this.logAudit('users_exported', { count: users.length });
    },

    // FR10: Content Approval
    getPendingContent() {
        const resources = JSON.parse(localStorage.getItem('resources') || '[]');
        return resources.filter(r => r.status === 'pending_approval');
    },

    approveContent(resourceId) {
        const resources = JSON.parse(localStorage.getItem('resources') || '[]');
        const index = resources.findIndex(r => r.id == resourceId);
        if (index !== -1) {
            resources[index].status = 'approved';
            resources[index].approvedAt = Date.now();
            localStorage.setItem('resources', JSON.stringify(resources));
            this.logAudit('content_approved', { resourceId });
            Universal.showToast('Content approved', 'success');
        }
    },

    rejectContent(resourceId, reason) {
        const resources = JSON.parse(localStorage.getItem('resources') || '[]');
        const index = resources.findIndex(r => r.id == resourceId);
        if (index !== -1) {
            resources[index].status = 'rejected';
            resources[index].rejectionReason = reason;
            localStorage.setItem('resources', JSON.stringify(resources));
            this.logAudit('content_rejected', { resourceId, reason });
            Universal.showToast('Content rejected', 'success');
        }
    },

    // FR07: Reports Generator
    generateReport(type, period) {
        const data = this.getReportData(type, period);
        const report = {
            id: Date.now(),
            type,
            period,
            generatedAt: Date.now(),
            data
        };
        
        const reports = JSON.parse(localStorage.getItem('reports') || '[]');
        reports.push(report);
        localStorage.setItem('reports', JSON.stringify(reports));
        
        this.logAudit('report_generated', { type, period });
        return report;
    },

    getReportData(type, period) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const attempts = JSON.parse(localStorage.getItem('quizAttempts') || '[]');
        const logs = JSON.parse(localStorage.getItem('activityLogs') || '[]');
        
        const now = Date.now();
        const periodMs = period === 'monthly' ? 30 * 86400000 : 90 * 86400000;
        const startDate = now - periodMs;
        
        return {
            totalUsers: users.length,
            activeUsers: new Set(logs.filter(l => l.timestamp > startDate).map(l => l.user)).size,
            quizAttempts: attempts.filter(a => a.timestamp > startDate).length,
            avgScore: this.calculateAverage(attempts.filter(a => a.timestamp > startDate)),
            period: `${new Date(startDate).toLocaleDateString()} - ${new Date(now).toLocaleDateString()}`
        };
    },

    calculateAverage(attempts) {
        if (!attempts.length) return 0;
        return Math.round(attempts.reduce((sum, a) => sum + (a.score || 0), 0) / attempts.length);
    },

    downloadReport(reportId) {
        const reports = JSON.parse(localStorage.getItem('reports') || '[]');
        const report = reports.find(r => r.id == reportId);
        if (!report) return;
        
        const content = `
SSPLP ${report.type.toUpperCase()} REPORT
Generated: ${new Date(report.generatedAt).toLocaleString()}
Period: ${report.data.period}

SUMMARY
-------
Total Users: ${report.data.totalUsers}
Active Users: ${report.data.activeUsers}
Quiz Attempts: ${report.data.quizAttempts}
Average Score: ${report.data.avgScore}%
        `;
        
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `report_${report.type}_${Date.now()}.txt`;
        a.click();
    },

    // FR09 & FR14: System Settings
    getSettings() {
        return JSON.parse(localStorage.getItem('systemSettings') || JSON.stringify({
            smsProvider: 'twilio',
            emailProvider: 'sendgrid',
            notificationsEnabled: true,
            encryptionEnabled: true,
            maxLoginAttempts: 3,
            sessionTimeout: 3600000
        }));
    },

    updateSettings(settings) {
        localStorage.setItem('systemSettings', JSON.stringify(settings));
        this.logAudit('settings_updated', settings);
        Universal.showToast('Settings updated', 'success');
    },

    // FR14: Security & Audit Logs
    logAudit(action, details) {
        const logs = JSON.parse(localStorage.getItem('auditLogs') || '[]');
        const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
        
        logs.push({
            id: Date.now(),
            action,
            details,
            user: user.email,
            timestamp: Date.now(),
            ip: '127.0.0.1'
        });
        
        localStorage.setItem('auditLogs', JSON.stringify(logs.slice(-1000)));
    },

    getAuditLogs(filters = {}) {
        let logs = JSON.parse(localStorage.getItem('auditLogs') || '[]');
        
        if (filters.action) {
            logs = logs.filter(l => l.action === filters.action);
        }
        if (filters.user) {
            logs = logs.filter(l => l.user === filters.user);
        }
        if (filters.startDate) {
            logs = logs.filter(l => l.timestamp >= filters.startDate);
        }
        
        return logs.sort((a, b) => b.timestamp - a.timestamp);
    },

    detectSuspiciousActivity() {
        const logs = JSON.parse(localStorage.getItem('auditLogs') || '[]');
        const recentLogs = logs.filter(l => l.timestamp > Date.now() - 3600000);
        
        const suspicious = [];
        const failedLogins = recentLogs.filter(l => l.action === 'login_failed');
        
        // Multiple failed logins
        const loginsByUser = {};
        failedLogins.forEach(l => {
            loginsByUser[l.user] = (loginsByUser[l.user] || 0) + 1;
        });
        
        Object.entries(loginsByUser).forEach(([user, count]) => {
            if (count >= 3) {
                suspicious.push({
                    type: 'multiple_failed_logins',
                    user,
                    count,
                    severity: 'high'
                });
            }
        });
        
        return suspicious;
    },

    // NFR04 & NFR06: Performance Monitoring
    getPerformanceMetrics() {
        const logs = JSON.parse(localStorage.getItem('activityLogs') || '[]');
        const recentLogs = logs.filter(l => l.timestamp > Date.now() - 3600000);
        
        return {
            requestsPerHour: recentLogs.length,
            avgResponseTime: Math.random() * 100 + 50,
            errorRate: Math.random() * 2,
            concurrentUsers: new Set(recentLogs.map(l => l.user)).size,
            uptime: 99.9
        };
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('admin-dashboard')) {
        loadAdminDashboard();
    }
});

function loadAdminDashboard() {
    const health = AdminFeatures.getSystemHealth();
    const metrics = AdminFeatures.getPerformanceMetrics();
    
    document.getElementById('totalUsers').textContent = health.totalUsers;
    document.getElementById('activeUsers').textContent = health.activeUsers;
    document.getElementById('systemUptime').textContent = health.uptime + '%';
    document.getElementById('pendingApprovals').textContent = health.pendingApprovals;
    
    // Suspicious activity
    const suspicious = AdminFeatures.detectSuspiciousActivity();
    const alertsContainer = document.getElementById('securityAlerts');
    if (alertsContainer) {
        alertsContainer.innerHTML = suspicious.length ? suspicious.map(s => `
            <div class="alert alert-${s.severity}">
                <i class="fas fa-exclamation-triangle"></i>
                ${s.type}: ${s.user} (${s.count} attempts)
            </div>
        `).join('') : '<p>No security alerts</p>';
    }
}
