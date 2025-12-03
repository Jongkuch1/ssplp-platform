// FR14: Security and Privacy Controls
// Data encryption and child protection compliance

class SecurityManager {
    constructor() {
        this.encryptionKey = 'SSPLP_SECURE_KEY_2025';
        this.childProtectionRules = {
            minAge: 13,
            parentalConsentRequired: true,
            dataRetentionDays: 365
        };
    }

    // Simple encryption (Base64 encoding for demo)
    encrypt(data) {
        try {
            const jsonString = JSON.stringify(data);
            return btoa(encodeURIComponent(jsonString));
        } catch (error) {
            console.error('Encryption error:', error);
            return null;
        }
    }

    // Simple decryption
    decrypt(encryptedData) {
        try {
            const jsonString = decodeURIComponent(atob(encryptedData));
            return JSON.parse(jsonString);
        } catch (error) {
            console.error('Decryption error:', error);
            return null;
        }
    }

    // Hash password (simple hash for demo)
    hashPassword(password) {
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash.toString(36);
    }

    // Validate password strength
    validatePasswordStrength(password) {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        
        return {
            isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers,
            length: password.length >= minLength,
            hasUpperCase,
            hasLowerCase,
            hasNumbers
        };
    }

    // Sanitize user input
    sanitizeInput(input) {
        if (typeof input !== 'string') return input;
        
        return input
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/\//g, '&#x2F;');
    }

    // Check child protection compliance
    checkChildProtection(userAge) {
        return {
            isCompliant: userAge >= this.childProtectionRules.minAge,
            requiresParentalConsent: userAge < 18,
            message: userAge < this.childProtectionRules.minAge 
                ? 'Users must be at least 13 years old' 
                : 'Compliant'
        };
    }

    // Secure data storage
    secureStore(key, data) {
        const encrypted = this.encrypt(data);
        if (encrypted) {
            localStorage.setItem(key, encrypted);
            this.logAccess('WRITE', key);
            return true;
        }
        return false;
    }

    // Secure data retrieval
    secureRetrieve(key) {
        const encrypted = localStorage.getItem(key);
        if (encrypted) {
            this.logAccess('READ', key);
            return this.decrypt(encrypted);
        }
        return null;
    }

    // Log data access for audit
    logAccess(action, resource) {
        const logs = JSON.parse(localStorage.getItem('accessLogs') || '[]');
        logs.push({
            action,
            resource,
            timestamp: new Date().toISOString(),
            user: this.getCurrentUser()
        });
        
        // Keep only last 100 logs
        if (logs.length > 100) {
            logs.shift();
        }
        
        localStorage.setItem('accessLogs', JSON.stringify(logs));
    }

    // Get current user
    getCurrentUser() {
        const currentUser = localStorage.getItem('currentUser');
        return currentUser ? JSON.parse(currentUser).email : 'anonymous';
    }

    // Validate session
    validateSession() {
        const sessionData = localStorage.getItem('sessionData');
        if (!sessionData) return false;
        
        const session = JSON.parse(sessionData);
        const now = new Date().getTime();
        const sessionAge = now - new Date(session.timestamp).getTime();
        const maxAge = 24 * 60 * 60 * 1000; // 24 hours
        
        return sessionAge < maxAge;
    }

    // Create secure session
    createSession(user) {
        const sessionData = {
            userId: user.id,
            email: user.email,
            role: user.role,
            timestamp: new Date().toISOString()
        };
        
        localStorage.setItem('sessionData', JSON.stringify(sessionData));
        this.logAccess('LOGIN', user.email);
    }

    // Destroy session
    destroySession() {
        const user = this.getCurrentUser();
        localStorage.removeItem('sessionData');
        this.logAccess('LOGOUT', user);
    }

    // Check for suspicious activity
    detectSuspiciousActivity() {
        const logs = JSON.parse(localStorage.getItem('accessLogs') || '[]');
        const recentLogs = logs.slice(-20);
        
        // Check for rapid repeated failed logins
        const failedLogins = recentLogs.filter(log => 
            log.action === 'LOGIN_FAILED'
        ).length;
        
        return {
            isSuspicious: failedLogins > 5,
            failedAttempts: failedLogins,
            recommendation: failedLogins > 5 ? 'Account temporarily locked' : 'Normal activity'
        };
    }

    // Data retention compliance
    cleanOldData() {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const retentionDays = this.childProtectionRules.dataRetentionDays;
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - retentionDays);
        
        users.forEach(user => {
            if (user.quizResults) {
                user.quizResults = user.quizResults.filter(result => {
                    const resultDate = new Date(result.date || result.timestamp);
                    return resultDate > cutoffDate;
                });
            }
        });
        
        localStorage.setItem('users', JSON.stringify(users));
    }

    // Generate security report
    generateSecurityReport() {
        const logs = JSON.parse(localStorage.getItem('accessLogs') || '[]');
        const suspiciousActivity = this.detectSuspiciousActivity();
        
        return {
            totalAccessLogs: logs.length,
            recentActivity: logs.slice(-10),
            suspiciousActivity: suspiciousActivity,
            sessionValid: this.validateSession(),
            lastCleanup: localStorage.getItem('lastDataCleanup') || 'Never',
            recommendations: this.getSecurityRecommendations(suspiciousActivity)
        };
    }

    // Get security recommendations
    getSecurityRecommendations(suspiciousActivity) {
        const recommendations = [];
        
        if (suspiciousActivity.isSuspicious) {
            recommendations.push('Review recent failed login attempts');
        }
        
        if (!this.validateSession()) {
            recommendations.push('Session expired - please login again');
        }
        
        recommendations.push('Regularly update your password');
        recommendations.push('Enable two-factor authentication when available');
        
        return recommendations;
    }
}

// Initialize security manager
const securityManager = new SecurityManager();

// Run data cleanup on load
document.addEventListener('DOMContentLoaded', () => {
    const lastCleanup = localStorage.getItem('lastDataCleanup');
    const now = new Date();
    
    if (!lastCleanup || (now - new Date(lastCleanup)) > 7 * 24 * 60 * 60 * 1000) {
        securityManager.cleanOldData();
        localStorage.setItem('lastDataCleanup', now.toISOString());
    }
});
