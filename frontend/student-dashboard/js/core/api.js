// API Configuration
const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000/api'
    : '/api'; // Use same domain (Vercel deployment)

// API Client
const API = {
    // Check if backend is available
    async checkBackend() {
        try {
            const response = await fetch(`${API_URL}/health`);
            return response.ok;
        } catch (error) {
            return false;
        }
    },

    // Auth endpoints
    auth: {
        async register(userData) {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
            if (!response.ok) throw new Error('Registration failed');
            return response.json();
        },

        async login(credentials) {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials)
            });
            if (!response.ok) throw new Error('Login failed');
            return response.json();
        },

        async getProfile(token) {
            const response = await fetch(`${API_URL}/auth/me`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to get profile');
            return response.json();
        }
    },

    // User endpoints
    users: {
        async getAll(token) {
            const response = await fetch(`${API_URL}/users`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to get users');
            return response.json();
        }
    },

    // Course endpoints
    courses: {
        async getAll(token) {
            const response = await fetch(`${API_URL}/courses`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to get courses');
            return response.json();
        },

        async create(courseData, token) {
            const response = await fetch(`${API_URL}/courses`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(courseData)
            });
            if (!response.ok) throw new Error('Failed to create course');
            return response.json();
        }
    },

    // Quiz endpoints
    quizzes: {
        async getAll(token) {
            const response = await fetch(`${API_URL}/quizzes`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to get quizzes');
            return response.json();
        },

        async create(quizData, token) {
            const response = await fetch(`${API_URL}/quizzes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(quizData)
            });
            if (!response.ok) throw new Error('Failed to create quiz');
            return response.json();
        }
    },

    // Assignment endpoints
    assignments: {
        async getAll(token) {
            const response = await fetch(`${API_URL}/assignments`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to get assignments');
            return response.json();
        }
    },

    // Meeting endpoints (FR05)
    meetings: {
        async getAll(token) {
            const response = await fetch(`${API_URL}/meetings`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to get meetings');
            return response.json();
        },

        async getForStudent(studentId, email, token) {
            const response = await fetch(`${API_URL}/meetings/student/${studentId}?email=${email}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to get student meetings');
            return response.json();
        },

        async create(meetingData, token) {
            const response = await fetch(`${API_URL}/meetings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(meetingData)
            });
            if (!response.ok) throw new Error('Failed to create meeting');
            return response.json();
        }
    },

    // Message endpoints (FR11)
    messages: {
        async getConversation(userId1, userId2, token) {
            const response = await fetch(`${API_URL}/messages?userId1=${userId1}&userId2=${userId2}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to get messages');
            return response.json();
        },

        async send(messageData, token) {
            const response = await fetch(`${API_URL}/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(messageData)
            });
            if (!response.ok) throw new Error('Failed to send message');
            return response.json();
        }
    },

    // Adaptive learning endpoints (FR02)
    adaptive: {
        async getProfile(studentId, token) {
            const response = await fetch(`${API_URL}/adaptive/${studentId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to get adaptive profile');
            return response.json();
        },

        async updateProfile(profileData, token) {
            const response = await fetch(`${API_URL}/adaptive`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(profileData)
            });
            if (!response.ok) throw new Error('Failed to update adaptive profile');
            return response.json();
        }
    },

    // Reports endpoints (FR07)
    reports: {
        async getStudentReport(studentId, token) {
            const response = await fetch(`${API_URL}/reports/student/${studentId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to get report');
            return response.json();
        }
    },

    // Notification endpoints (FR09)
    notifications: {
        async send(notificationData, token) {
            const response = await fetch(`${API_URL}/notifications/send`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(notificationData)
            });
            if (!response.ok) throw new Error('Failed to send notification');
            return response.json();
        }
    }
};

// Make API available globally
window.API = API;
