// Messaging System
let currentChat = null;

document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (!currentUser.email) {
        window.location.href = 'login.html';
        return;
    }

    loadContacts();
});

function loadContacts() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Get contacts based on role
    let contacts = [];
    if (currentUser.role === 'student') {
        contacts = users.filter(u => u.role === 'teacher');
    } else if (currentUser.role === 'teacher') {
        contacts = users.filter(u => u.role === 'student');
    } else {
        contacts = users.filter(u => u.email !== currentUser.email);
    }
    
    const container = document.getElementById('contactsList');
    container.innerHTML = contacts.map(contact => `
        <div class="contact-item" onclick="openChat('${contact.email}')">
            <i class="fas fa-user-circle" style="font-size: 2rem; color: #2563eb;"></i>
            <div style="flex: 1; margin-left: 10px;">
                <strong>${contact.name}</strong>
                <p style="margin: 0; color: #64748b; font-size: 0.9rem;">${contact.role}</p>
            </div>
        </div>
    `).join('');
}

function openChat(contactEmail) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const contact = users.find(u => u.email === contactEmail);
    
    currentChat = contactEmail;
    
    document.getElementById('chatHeader').innerHTML = `
        <i class="fas fa-user-circle" style="font-size: 1.5rem; color: #2563eb;"></i>
        <h3 style="margin: 0 0 0 10px;">${contact.name}</h3>
    `;
    
    document.getElementById('messageInput').style.display = 'flex';
    loadMessages(contactEmail);
}

function loadMessages(contactEmail) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const messages = JSON.parse(localStorage.getItem('messages') || '{}');
    const chatKey = [currentUser.email, contactEmail].sort().join('_');
    const chatMessages = messages[chatKey] || [];
    
    const container = document.getElementById('messagesContainer');
    container.innerHTML = chatMessages.map(msg => `
        <div class="message ${msg.sender === currentUser.email ? 'sent' : 'received'}">
            <p style="margin: 0;">${msg.text}</p>
            <small style="opacity: 0.7;">${new Date(msg.timestamp).toLocaleTimeString()}</small>
        </div>
    `).join('');
    
    container.scrollTop = container.scrollHeight;
}

function sendMessage() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const messageText = document.getElementById('messageText').value.trim();
    
    if (!messageText || !currentChat) return;
    
    const messages = JSON.parse(localStorage.getItem('messages') || '{}');
    const chatKey = [currentUser.email, currentChat].sort().join('_');
    
    if (!messages[chatKey]) {
        messages[chatKey] = [];
    }
    
    messages[chatKey].push({
        sender: currentUser.email,
        text: messageText,
        timestamp: Date.now()
    });
    
    localStorage.setItem('messages', JSON.stringify(messages));
    
    document.getElementById('messageText').value = '';
    loadMessages(currentChat);
    
    // Send notification to recipient
    if (window.NotificationSystem) {
        window.NotificationSystem.create(currentChat, {
            type: 'message',
            message: `New message from ${currentUser.name}`,
            link: 'messaging.html'
        });
    }
}

// Send message on Enter key
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && document.getElementById('messageText') === document.activeElement) {
        sendMessage();
    }
});
