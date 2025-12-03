// Virtual Tutoring System
document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (!currentUser.email) {
        window.location.href = 'login.html';
        return;
    }

    loadSubjects();
    loadSessions();
    
    document.getElementById('scheduleForm').addEventListener('submit', scheduleSession);
});

function loadSubjects() {
    const subjects = [
        'Mathematics', 'English', 'Physics', 'Chemistry', 'Biology',
        'Agriculture', 'Additional Mathematics', 'ICT', 'History',
        'Geography', 'Commerce', 'Accounting', 'Literature', 'CRE', 'Citizenship'
    ];
    
    const select = document.getElementById('sessionSubject');
    select.innerHTML = subjects.map(s => `<option value="${s}">${s}</option>`).join('');
}

function scheduleSession(e) {
    e.preventDefault();
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const session = {
        id: Date.now(),
        type: document.getElementById('sessionType').value,
        subject: document.getElementById('sessionSubject').value,
        dateTime: document.getElementById('sessionDateTime').value,
        duration: document.getElementById('sessionDuration').value,
        studentEmail: currentUser.email,
        status: 'scheduled',
        meetingLink: `https://meet.ssplp.org/${Date.now()}`, // Simulated link
        createdAt: Date.now()
    };
    
    let sessions = JSON.parse(localStorage.getItem('tutoringSessions') || '[]');
    sessions.push(session);
    localStorage.setItem('tutoringSessions', JSON.stringify(sessions));
    
    // Send notification
    if (window.NotificationSystem) {
        window.NotificationSystem.create(currentUser.email, {
            type: 'session',
            message: `Tutoring session scheduled for ${new Date(session.dateTime).toLocaleString()}`,
            link: 'tutoring.html'
        });
    }
    
    alert('Session scheduled successfully!');
    e.target.reset();
    loadSessions();
}

function loadSessions() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const sessions = JSON.parse(localStorage.getItem('tutoringSessions') || '[]');
    const userSessions = sessions.filter(s => s.studentEmail === currentUser.email);
    
    const now = Date.now();
    const upcoming = userSessions.filter(s => new Date(s.dateTime).getTime() > now);
    const past = userSessions.filter(s => new Date(s.dateTime).getTime() <= now);
    
    // Upcoming sessions
    const upcomingContainer = document.getElementById('upcomingSessions');
    if (upcoming.length === 0) {
        upcomingContainer.innerHTML = '<p style="color: #64748b;">No upcoming sessions</p>';
    } else {
        upcomingContainer.innerHTML = upcoming.map(session => `
            <div style="padding: 15px; border: 1px solid #e5e7eb; border-radius: 8px; margin-bottom: 10px;">
                <div style="display: flex; justify-content: space-between; align-items: start;">
                    <div>
                        <strong>${session.subject}</strong>
                        <p style="margin: 5px 0; color: #64748b;">
                            <i class="fas fa-calendar"></i> ${new Date(session.dateTime).toLocaleString()}<br>
                            <i class="fas fa-clock"></i> ${session.duration} minutes<br>
                            <i class="fas fa-users"></i> ${session.type}
                        </p>
                    </div>
                    <button onclick="joinSession('${session.meetingLink}')" class="btn btn-primary btn-sm">
                        <i class="fas fa-video"></i> Join
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    // Past sessions
    const pastContainer = document.getElementById('pastSessions');
    if (past.length === 0) {
        pastContainer.innerHTML = '<p style="color: #64748b;">No past sessions</p>';
    } else {
        pastContainer.innerHTML = past.slice(0, 5).map(session => `
            <div style="padding: 15px; border: 1px solid #e5e7eb; border-radius: 8px; margin-bottom: 10px; opacity: 0.7;">
                <strong>${session.subject}</strong>
                <p style="margin: 5px 0; color: #64748b;">
                    ${new Date(session.dateTime).toLocaleDateString()} - ${session.duration} minutes
                </p>
            </div>
        `).join('');
    }
}

function joinSession(meetingLink) {
    alert(`Opening video conference...\n\nIn production, this would open:\n${meetingLink}\n\nIntegration options:\n- Zoom API\n- Google Meet\n- Jitsi Meet\n- WebRTC`);
    
    // In production, this would open the actual video conference
    // window.open(meetingLink, '_blank');
}
