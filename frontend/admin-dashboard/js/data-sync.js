// Global Data Synchronization System - Fetches real data from backend
class DataSync {
    constructor() {
        this.backendAvailable = false;
        this.checkBackend();
    }

    async checkBackend() {
        try {
            const response = await fetch('http://localhost:5000/api/health');
            this.backendAvailable = response.ok;
            console.log(this.backendAvailable ? '✅ Backend connected - Using real database' : '⚠️ Backend offline - Using localStorage');
        } catch {
            this.backendAvailable = false;
            console.log('⚠️ Backend offline - Using localStorage');
        }
    }

    async syncAllData() {
        if (!this.backendAvailable || !window.API) {
            console.log('Using localStorage data');
            return;
        }

        try {
            // Sync users from database
            const users = await API.users.getAll();
            localStorage.setItem('users', JSON.stringify(users));
            console.log(`✅ Synced ${users.length} users from database`);

            // Sync courses
            const courses = await API.courses.getAll();
            localStorage.setItem('courses', JSON.stringify(courses));
            console.log(`✅ Synced ${courses.length} courses from database`);

            // Sync quizzes
            const quizzes = await API.quizzes.getAll();
            localStorage.setItem('quizzes', JSON.stringify(quizzes));
            console.log(`✅ Synced ${quizzes.length} quizzes from database`);

            // Sync assignments
            const assignments = await API.assignments.getAll();
            localStorage.setItem('assignments', JSON.stringify(assignments));
            console.log(`✅ Synced ${assignments.length} assignments from database`);

            localStorage.setItem('lastSync', Date.now().toString());
        } catch (error) {
            console.error('Sync error:', error);
        }
    }

    async getUserData() {
        if (this.backendAvailable && window.API) {
            try {
                return await API.users.getAll();
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        }
        return JSON.parse(localStorage.getItem('users') || '[]');
    }

    async getCourseData() {
        if (this.backendAvailable && window.API) {
            try {
                return await API.courses.getAll();
            } catch (error) {
                console.error('Failed to fetch courses:', error);
            }
        }
        return JSON.parse(localStorage.getItem('courses') || '[]');
    }

    async getQuizData() {
        if (this.backendAvailable && window.API) {
            try {
                return await API.quizzes.getAll();
            } catch (error) {
                console.error('Failed to fetch quizzes:', error);
            }
        }
        return JSON.parse(localStorage.getItem('quizzes') || '[]');
    }

    async getAssignmentData() {
        if (this.backendAvailable && window.API) {
            try {
                return await API.assignments.getAll();
            } catch (error) {
                console.error('Failed to fetch assignments:', error);
            }
        }
        return JSON.parse(localStorage.getItem('assignments') || '[]');
    }
}

// Initialize global data sync
window.dataSync = new DataSync();

// Auto-sync on page load
document.addEventListener('DOMContentLoaded', async () => {
    if (localStorage.getItem('token')) {
        await window.dataSync.syncAllData();
    }
});
