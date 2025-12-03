// Universal Dashboard Components
const Universal = {
    // Initialize universal features
    init() {
        this.setupTopBar();
        this.setupSidebar();
        this.setupSearch();
        this.setupNotifications();
        this.setupLanguage();
        this.setupOfflineSync();
        this.setupAccessibility();
        this.logActivity('page_view');
    },

    // Top bar with search, notifications, profile, settings, language, logout
    setupTopBar() {
        const topBar = document.querySelector('.top-bar');
        if (!topBar) return;

        // Search functionality
        const searchInput = topBar.querySelector('.search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }

        // Notifications
        const notifBtn = topBar.querySelector('.notif-btn');
        if (notifBtn) {
            notifBtn.addEventListener('click', () => this.toggleNotifications());
            this.updateNotificationBadge();
        }

        // Profile menu
        const profileBtn = topBar.querySelector('.profile-btn');
        if (profileBtn) {
            profileBtn.addEventListener('click', () => this.toggleProfileMenu());
        }

        // Settings
        const settingsBtn = topBar.querySelector('.settings-btn');
        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => window.location.href = 'settings.html');
        }

        // Language switcher
        const langBtn = topBar.querySelector('.lang-btn');
        if (langBtn) {
            langBtn.addEventListener('click', () => this.toggleLanguageMenu());
        }
    },

    // Collapsible sidebar
    setupSidebar() {
        const toggleBtn = document.querySelector('.sidebar-toggle');
        const sidebar = document.querySelector('.sidebar');
        
        if (toggleBtn && sidebar) {
            toggleBtn.addEventListener('click', () => {
                sidebar.classList.toggle('collapsed');
                localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
            });

            // Restore state
            if (localStorage.getItem('sidebarCollapsed') === 'true') {
                sidebar.classList.add('collapsed');
            }
        }
    },

    // Search functionality
    handleSearch(query) {
        if (query.length < 2) return;
        
        const results = this.searchContent(query);
        this.displaySearchResults(results);
        this.logActivity('search', { query });
    },

    searchContent(query) {
        const searchableContent = [
            { type: 'subject', name: 'Mathematics', url: 'subjects.html?subject=math' },
            { type: 'subject', name: 'English', url: 'subjects.html?subject=english' },
            { type: 'quiz', name: 'Math Quiz', url: 'quizzes.html?subject=math' },
            { type: 'page', name: 'Progress', url: 'progress.html' }
        ];

        return searchableContent.filter(item => 
            item.name.toLowerCase().includes(query.toLowerCase())
        );
    },

    displaySearchResults(results) {
        const dropdown = document.querySelector('.search-dropdown');
        if (!dropdown) return;

        dropdown.innerHTML = results.length 
            ? results.map(r => `<a href="${r.url}" class="search-result">${r.name}</a>`).join('')
            : '<div class="no-results">No results found</div>';
        dropdown.style.display = 'block';
    },

    // Notifications
    toggleNotifications() {
        const panel = document.querySelector('.notif-panel');
        if (panel) {
            panel.classList.toggle('show');
            if (panel.classList.contains('show')) {
                this.loadNotifications();
            }
        }
    },

    loadNotifications() {
        const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
        const panel = document.querySelector('.notif-panel');
        if (!panel) return;

        panel.innerHTML = notifications.length
            ? notifications.map(n => `
                <div class="notif-item ${n.read ? '' : 'unread'}">
                    <strong>${n.title}</strong>
                    <p>${n.message}</p>
                    <small>${this.formatTime(n.timestamp)}</small>
                </div>
            `).join('')
            : '<div class="no-notifs">No notifications</div>';
    },

    updateNotificationBadge() {
        const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
        const unread = notifications.filter(n => !n.read).length;
        const badge = document.querySelector('.notif-badge');
        
        if (badge) {
            badge.textContent = unread;
            badge.style.display = unread > 0 ? 'block' : 'none';
        }
    },

    // Profile menu
    toggleProfileMenu() {
        const menu = document.querySelector('.profile-menu');
        if (menu) menu.classList.toggle('show');
    },

    // Language switcher
    toggleLanguageMenu() {
        const menu = document.querySelector('.lang-menu');
        if (menu) menu.classList.toggle('show');
    },

    switchLanguage(lang) {
        localStorage.setItem('language', lang);
        document.documentElement.lang = lang;
        document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
        this.logActivity('language_change', { language: lang });
        location.reload();
    },

    // Offline sync
    setupOfflineSync() {
        window.addEventListener('online', () => this.syncOfflineQueue());
        window.addEventListener('offline', () => this.showToast('You are offline', 'warning'));
        
        // Sync on load if online
        if (navigator.onLine) {
            this.syncOfflineQueue();
        }
    },

    syncOfflineQueue() {
        const queue = JSON.parse(localStorage.getItem('offlineQueue') || '[]');
        if (queue.length === 0) return;

        this.showToast('Syncing offline activities...', 'info');
        
        queue.forEach(activity => {
            this.logActivity(activity.type, activity.data);
        });

        localStorage.setItem('offlineQueue', '[]');
        this.showToast('Sync complete', 'success');
    },

    queueOfflineActivity(type, data) {
        const queue = JSON.parse(localStorage.getItem('offlineQueue') || '[]');
        queue.push({ type, data, timestamp: Date.now() });
        localStorage.setItem('offlineQueue', JSON.stringify(queue));
    },

    // Accessibility
    setupAccessibility() {
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                document.querySelector('.search-input')?.focus();
            }
        });

        // Focus trap for modals
        document.querySelectorAll('.modal').forEach(modal => {
            this.setupFocusTrap(modal);
        });

        // ARIA labels
        this.updateAriaLabels();
    },

    setupFocusTrap(element) {
        const focusableElements = element.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        element.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        });
    },

    updateAriaLabels() {
        document.querySelectorAll('[data-aria-label]').forEach(el => {
            el.setAttribute('aria-label', el.dataset.ariaLabel);
        });
    },

    // Common components
    showModal(title, content, actions = []) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content" role="dialog" aria-modal="true">
                <h3>${title}</h3>
                <div class="modal-body">${content}</div>
                <div class="modal-actions">
                    ${actions.map(a => `<button class="btn ${a.class}" onclick="${a.action}">${a.label}</button>`).join('')}
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        modal.querySelector('.modal-content').focus();
    },

    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => toast.classList.add('show'), 10);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    },

    showConfirm(message, onConfirm) {
        this.showModal('Confirm', message, [
            { label: 'Cancel', class: 'btn-secondary', action: 'Universal.closeAllModals()' },
            { label: 'Confirm', class: 'btn-primary', action: `Universal.closeAllModals(); (${onConfirm})()` }
        ]);
    },

    showLoading(show = true) {
        let loader = document.querySelector('.loading-overlay');
        if (show) {
            if (!loader) {
                loader = document.createElement('div');
                loader.className = 'loading-overlay';
                loader.innerHTML = '<div class="spinner"></div>';
                document.body.appendChild(loader);
            }
            loader.style.display = 'flex';
        } else if (loader) {
            loader.style.display = 'none';
        }
    },

    closeAllModals() {
        document.querySelectorAll('.modal, .notif-panel, .profile-menu, .lang-menu, .search-dropdown').forEach(el => {
            el.classList.remove('show');
            if (el.classList.contains('modal')) el.remove();
        });
    },

    // Logging & Analytics
    logActivity(type, data = {}) {
        const activity = {
            type,
            data,
            timestamp: Date.now(),
            user: JSON.parse(localStorage.getItem('currentUser') || '{}').email,
            page: window.location.pathname
        };

        if (navigator.onLine) {
            this.sendAnalytics(activity);
        } else {
            this.queueOfflineActivity(type, data);
        }

        // Store locally
        const logs = JSON.parse(localStorage.getItem('activityLogs') || '[]');
        logs.push(activity);
        localStorage.setItem('activityLogs', JSON.stringify(logs.slice(-100))); // Keep last 100
    },

    sendAnalytics(activity) {
        console.log('Analytics:', activity);
        // Future: Send to backend API
    },

    // Utilities
    formatTime(timestamp) {
        const diff = Date.now() - timestamp;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) return `${days}d ago`;
        if (hours > 0) return `${hours}h ago`;
        if (minutes > 0) return `${minutes}m ago`;
        return 'Just now';
    }
};

// Initialize on load
document.addEventListener('DOMContentLoaded', () => Universal.init());
