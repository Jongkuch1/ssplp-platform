// API Configuration
const API_URL = 'http://localhost:5000/api';

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
    }
};

// Make API available globally
window.API = API;
