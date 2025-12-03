// Universal Logout Handler - Works on all pages
(function() {
    'use strict';
    
    function logout() {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        window.location.href = 'index.html';
    }
    
    // Make logout globally available
    window.logout = logout;
    
    // Auto-attach to logout buttons when DOM is ready
    function attachLogoutHandlers() {
        const logoutButtons = document.querySelectorAll('#logoutBtn, .btn-logout, [onclick*="logout"]');
        logoutButtons.forEach(btn => {
            // Remove any existing onclick
            btn.removeAttribute('onclick');
            
            // Add new click handler
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                logout();
                return false;
            });
        });
    }
    
    // Attach on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', attachLogoutHandlers);
    } else {
        attachLogoutHandlers();
    }
    
    // Also attach after a short delay to catch dynamically added buttons
    setTimeout(attachLogoutHandlers, 500);
})();
