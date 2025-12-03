// Virtual Tutoring with Video Conferencing (FR05)

class VideoConferencing {
    constructor() {
        this.localStream = null;
        this.peerConnection = null;
        this.isVideoEnabled = true;
        this.isAudioEnabled = true;
    }

    async startSession(roomId) {
        try {
            this.localStream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            });
            
            const videoElement = document.getElementById('localVideo');
            if (videoElement) {
                videoElement.srcObject = this.localStream;
            }
            
            this.setupControls();
            return true;
        } catch (error) {
            console.error('Camera/Microphone access denied:', error);
            this.showFallbackMessage();
            return false;
        }
    }

    setupControls() {
        const controls = document.getElementById('videoControls');
        if (!controls) return;

        controls.innerHTML = `
            <button onclick="videoConferencing.toggleVideo()" id="videoBtn" class="btn btn-primary">
                <i class="fas fa-video"></i> Video
            </button>
            <button onclick="videoConferencing.toggleAudio()" id="audioBtn" class="btn btn-primary">
                <i class="fas fa-microphone"></i> Audio
            </button>
            <button onclick="videoConferencing.shareScreen()" class="btn btn-secondary">
                <i class="fas fa-desktop"></i> Share Screen
            </button>
            <button onclick="videoConferencing.endSession()" class="btn btn-danger">
                <i class="fas fa-phone-slash"></i> End Call
            </button>
        `;
    }

    toggleVideo() {
        if (this.localStream) {
            this.isVideoEnabled = !this.isVideoEnabled;
            this.localStream.getVideoTracks()[0].enabled = this.isVideoEnabled;
            
            const btn = document.getElementById('videoBtn');
            btn.innerHTML = this.isVideoEnabled ? 
                '<i class="fas fa-video"></i> Video' : 
                '<i class="fas fa-video-slash"></i> Video Off';
        }
    }

    toggleAudio() {
        if (this.localStream) {
            this.isAudioEnabled = !this.isAudioEnabled;
            this.localStream.getAudioTracks()[0].enabled = this.isAudioEnabled;
            
            const btn = document.getElementById('audioBtn');
            btn.innerHTML = this.isAudioEnabled ? 
                '<i class="fas fa-microphone"></i> Audio' : 
                '<i class="fas fa-microphone-slash"></i> Muted';
        }
    }

    async shareScreen() {
        try {
            const screenStream = await navigator.mediaDevices.getDisplayMedia({
                video: true
            });
            
            const videoElement = document.getElementById('localVideo');
            if (videoElement) {
                videoElement.srcObject = screenStream;
            }
            
            screenStream.getVideoTracks()[0].onended = () => {
                if (this.localStream) {
                    videoElement.srcObject = this.localStream;
                }
            };
        } catch (error) {
            console.error('Screen sharing failed:', error);
        }
    }

    endSession() {
        if (this.localStream) {
            this.localStream.getTracks().forEach(track => track.stop());
            this.localStream = null;
        }
        
        const videoElement = document.getElementById('localVideo');
        if (videoElement) {
            videoElement.srcObject = null;
        }
        
        window.location.href = 'dashboard.html';
    }

    showFallbackMessage() {
        const container = document.getElementById('videoContainer');
        if (container) {
            container.innerHTML = `
                <div class="fallback-message">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h3>Camera/Microphone Access Required</h3>
                    <p>Please allow camera and microphone access to join the tutoring session.</p>
                    <p>Alternatively, you can use text chat for communication.</p>
                    <button onclick="window.location.href='messaging.html'" class="btn btn-primary">
                        Use Text Chat Instead
                    </button>
                </div>
            `;
        }
    }

    scheduleSession(tutorId, dateTime, subject) {
        const sessions = JSON.parse(localStorage.getItem('tutoringSessions') || '[]');
        const session = {
            id: Date.now(),
            tutorId,
            dateTime,
            subject,
            status: 'scheduled',
            roomId: 'room-' + Date.now()
        };
        
        sessions.push(session);
        localStorage.setItem('tutoringSessions', JSON.stringify(sessions));
        
        if (typeof notificationSystem !== 'undefined') {
            notificationSystem.scheduleNotification(
                'Tutoring Session Reminder',
                `Your ${subject} tutoring session is scheduled for ${new Date(dateTime).toLocaleString()}`,
                dateTime
            );
        }
        
        return session;
    }

    getUpcomingSessions() {
        const sessions = JSON.parse(localStorage.getItem('tutoringSessions') || '[]');
        const now = new Date();
        return sessions.filter(s => new Date(s.dateTime) > now && s.status === 'scheduled');
    }
}

const videoConferencing = new VideoConferencing();
