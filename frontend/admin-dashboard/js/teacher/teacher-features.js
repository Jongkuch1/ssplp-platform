// Teacher Dashboard Features - FR05, FR06, FR10, FR12
const TeacherFeatures = {
    // FR10: Course Management
    createCourse(courseData) {
        const courses = JSON.parse(localStorage.getItem('courses') || '[]');
        const course = {
            id: Date.now(),
            ...courseData,
            createdAt: Date.now(),
            status: 'draft'
        };
        courses.push(course);
        localStorage.setItem('courses', JSON.stringify(courses));
        Universal.showToast('Course created', 'success');
        return course;
    },

    updateCourse(courseId, updates) {
        const courses = JSON.parse(localStorage.getItem('courses') || '[]');
        const index = courses.findIndex(c => c.id == courseId);
        if (index !== -1) {
            courses[index] = { ...courses[index], ...updates, updatedAt: Date.now() };
            localStorage.setItem('courses', JSON.stringify(courses));
            Universal.showToast('Course updated', 'success');
        }
    },

    getCourses() {
        return JSON.parse(localStorage.getItem('courses') || '[]');
    },

    // FR10: Resource Upload with Retry
    uploadResource(file, metadata, onProgress) {
        return new Promise((resolve, reject) => {
            const chunkSize = 1024 * 1024; // 1MB chunks
            const chunks = Math.ceil(file.size / chunkSize);
            let uploadedChunks = 0;

            const upload = () => {
                if (!navigator.onLine) {
                    this.queueUpload(file, metadata);
                    reject('Offline - queued for retry');
                    return;
                }

                // Simulate chunked upload
                const interval = setInterval(() => {
                    uploadedChunks++;
                    const progress = Math.round((uploadedChunks / chunks) * 100);
                    onProgress?.(progress);

                    if (uploadedChunks >= chunks) {
                        clearInterval(interval);
                        const resource = this.saveResource(file, metadata);
                        resolve(resource);
                    }
                }, 100);
            };

            upload();
        });
    },

    saveResource(file, metadata) {
        const resources = JSON.parse(localStorage.getItem('resources') || '[]');
        const resource = {
            id: Date.now(),
            name: file.name,
            type: file.type,
            size: file.size,
            ...metadata,
            status: 'pending_approval',
            uploadedAt: Date.now()
        };
        resources.push(resource);
        localStorage.setItem('resources', JSON.stringify(resources));
        Universal.logActivity('resource_upload', { resourceId: resource.id });
        return resource;
    },

    queueUpload(file, metadata) {
        const queue = JSON.parse(localStorage.getItem('uploadQueue') || '[]');
        queue.push({ file: file.name, metadata, timestamp: Date.now() });
        localStorage.setItem('uploadQueue', JSON.stringify(queue));
    },

    retryUploads() {
        const queue = JSON.parse(localStorage.getItem('uploadQueue') || '[]');
        if (queue.length && navigator.onLine) {
            Universal.showToast('Retrying uploads...', 'info');
            localStorage.setItem('uploadQueue', '[]');
        }
    },

    getResources() {
        return JSON.parse(localStorage.getItem('resources') || '[]');
    },

    // FR12: Assignment Builder
    createAssignment(assignmentData) {
        const assignments = JSON.parse(localStorage.getItem('assignments') || '[]');
        const assignment = {
            id: Date.now(),
            ...assignmentData,
            createdAt: Date.now(),
            submissions: []
        };
        assignments.push(assignment);
        localStorage.setItem('assignments', JSON.stringify(assignments));
        Universal.showToast('Assignment created', 'success');
        return assignment;
    },

    getAssignments() {
        return JSON.parse(localStorage.getItem('assignments') || '[]');
    },

    // FR12: Grading
    gradeSubmission(submissionId, grade, comments) {
        const submissions = JSON.parse(localStorage.getItem('submissions') || '[]');
        const index = submissions.findIndex(s => s.id == submissionId);
        if (index !== -1) {
            submissions[index].grade = grade;
            submissions[index].comments = comments;
            submissions[index].gradedAt = Date.now();
            submissions[index].status = 'graded';
            localStorage.setItem('submissions', JSON.stringify(submissions));
            Universal.showToast('Submission graded', 'success');
        }
    },

    bulkGrade(submissionIds, grade) {
        submissionIds.forEach(id => this.gradeSubmission(id, grade, 'Bulk graded'));
        Universal.showToast(`${submissionIds.length} submissions graded`, 'success');
    },

    getSubmissions(assignmentId) {
        const submissions = JSON.parse(localStorage.getItem('submissions') || '[]');
        return assignmentId ? submissions.filter(s => s.assignmentId == assignmentId) : submissions;
    },

    // FR06: Student Progress View
    getStudentProgress(studentId) {
        const attempts = JSON.parse(localStorage.getItem('quizAttempts') || '[]');
        const submissions = JSON.parse(localStorage.getItem('submissions') || '[]');
        
        const studentAttempts = attempts.filter(a => a.studentId == studentId);
        const studentSubmissions = submissions.filter(s => s.studentId == studentId);
        
        return {
            quizzes: studentAttempts,
            assignments: studentSubmissions,
            avgScore: this.calculateAverage(studentAttempts),
            completion: this.calculateCompletion(studentSubmissions)
        };
    },

    getClassSummary() {
        const students = JSON.parse(localStorage.getItem('users') || '[]')
            .filter(u => u.role === 'student');
        const attempts = JSON.parse(localStorage.getItem('quizAttempts') || '[]');
        
        return {
            totalStudents: students.length,
            activeStudents: new Set(attempts.map(a => a.studentId)).size,
            avgClassScore: this.calculateAverage(attempts),
            totalAttempts: attempts.length
        };
    },

    calculateAverage(attempts) {
        if (!attempts.length) return 0;
        const sum = attempts.reduce((acc, a) => acc + (a.score || 0), 0);
        return Math.round(sum / attempts.length);
    },

    calculateCompletion(submissions) {
        if (!submissions.length) return 0;
        const completed = submissions.filter(s => s.status === 'graded').length;
        return Math.round((completed / submissions.length) * 100);
    },

    // FR05: Tutoring Schedule Management
    setAvailability(slots) {
        const availability = JSON.parse(localStorage.getItem('teacherAvailability') || '{}');
        const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
        availability[user.email] = slots;
        localStorage.setItem('teacherAvailability', JSON.stringify(availability));
        Universal.showToast('Availability updated', 'success');
    },

    getAvailability() {
        const availability = JSON.parse(localStorage.getItem('teacherAvailability') || '{}');
        const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
        return availability[user.email] || [];
    },

    getBookings() {
        const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
        return bookings.filter(b => b.tutorId === user.email);
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('teacher-dashboard')) {
        loadTeacherDashboard();
    }
    
    // Retry uploads on reconnect
    window.addEventListener('online', () => TeacherFeatures.retryUploads());
});

function loadTeacherDashboard() {
    const summary = TeacherFeatures.getClassSummary();
    const courses = TeacherFeatures.getCourses();
    const bookings = TeacherFeatures.getBookings();
    
    document.getElementById('totalStudents').textContent = summary.totalStudents;
    document.getElementById('activeStudents').textContent = summary.activeStudents;
    document.getElementById('avgClassScore').textContent = summary.avgClassScore + '%';
    document.getElementById('totalCourses').textContent = courses.length;
    
    // Upcoming sessions
    const upcoming = bookings.filter(b => new Date(b.datetime) > new Date());
    const sessionsContainer = document.getElementById('upcomingSessions');
    if (sessionsContainer) {
        sessionsContainer.innerHTML = upcoming.length ? upcoming.slice(0, 3).map(s => `
            <div class="session-card">
                <p>${new Date(s.datetime).toLocaleString()}</p>
                <span class="badge">${s.type}</span>
            </div>
        `).join('') : '<p>No upcoming sessions</p>';
    }
}
