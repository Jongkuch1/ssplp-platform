// Message Notification Badge
document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;

    function updateMessageBadge() {
        const messages = JSON.parse(localStorage.getItem('messages') || '[]');
        const unreadCount = messages.filter(m => 
            m.receiverId === currentUser.id && !m.read
        ).length;

        // Find Messages link in navigation
        const messagesLinks = document.querySelectorAll('a[href="messaging.html"]');
        
        messagesLinks.forEach(link => {
            // Remove existing badge
            const existingBadge = link.querySelector('.message-badge');
            if (existingBadge) {
                existingBadge.remove();
            }

            // Add badge if there are unread messages
            if (unreadCount > 0) {
                const badge = document.createElement('span');
                badge.className = 'message-badge';
                badge.textContent = unreadCount;
                badge.style.cssText = `
                    position: absolute;
                    top: -5px;
                    right: -10px;
                    background: #ef4444;
                    color: white;
                    border-radius: 10px;
                    padding: 2px 6px;
                    font-size: 0.7rem;
                    font-weight: bold;
                    min-width: 18px;
                    text-align: center;
                `;
                
                // Make link position relative
                link.style.position = 'relative';
                link.appendChild(badge);
            }
        });
    }

    // Update badge immediately
    updateMessageBadge();

    // Update badge every 3 seconds
    setInterval(updateMessageBadge, 3000);
});
