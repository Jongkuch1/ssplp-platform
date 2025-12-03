// Notification System
class NotificationSystem {
    constructor() {
        this.notifications = JSON.parse(localStorage.getItem('notifications') || '{}');
    }

    // Create notification
    create(userEmail, notification) {
        if (!this.notifications[userEmail]) {
            this.notifications[userEmail] = [];
        }
        
        this.notifications[userEmail].push({
            id: Date.now(),
            ...notification,
            read: false,
            timestamp: Date.now()
        });
        
        localStorage.setItem('notifications', JSON.stringify(this.notifications));
        this.showBrowserNotification(notification);
    }

    // Show browser notification
    showBrowserNotification(notification) {
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('SSPLP', {
                body: notification.message,
                icon: 'logo..png'
            });
        }
    }

    // Request permission
    async requestPermission() {
        if ('Notification' in window) {
            const permission = await Notification.requestPermission();
            return permission === 'granted';
        }
        return false;
    }

    // Get user notifications
    getNotifications(userEmail) {
        return this.notifications[userEmail] || [];
    }

    // Mark as read
    markAsRead(userEmail, notificationId) {
        if (this.notifications[userEmail]) {
            const notification = this.notifications[userEmail]
                .find(n => n.id === notificationId);
            if (notification) {
                notification.read = true;
                localStorage.setItem('notifications', JSON.stringify(this.notifications));
            }
        }
    }

    // Get unread count
    getUnreadCount(userEmail) {
        const userNotifications = this.notifications[userEmail] || [];
        return userNotifications.filter(n => !n.read).length;
    }

    // Simulate email notification (for demo)
    sendEmailNotification(email, subject, message) {
        console.log(`📧 Email sent to ${email}`);
        console.log(`Subject: ${subject}`);
        console.log(`Message: ${message}`);
        
        // In production, this would call an email API
        return {
            success: true,
            message: 'Email notification sent (simulated)'
        };
    }

    // Simulate SMS notification (for demo)
    sendSMSNotification(phone, message) {
        console.log(`📱 SMS sent to ${phone}`);
        console.log(`Message: ${message}`);
        
        // In production, this would call an SMS API (Twilio, etc.)
        return {
            success: true,
            message: 'SMS notification sent (simulated)'
        };
    }
}

window.NotificationSystem = new NotificationSystem();

// Auto-request notification permission
window.NotificationSystem.requestPermission();
