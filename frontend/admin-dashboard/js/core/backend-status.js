// Backend Connection Status Indicator
(async function() {
    const isBackendAvailable = await API.checkBackend();
    
    // Create status indicator
    const indicator = document.createElement('div');
    indicator.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 10px 20px;
        border-radius: 25px;
        font-size: 12px;
        font-weight: 600;
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        cursor: pointer;
        transition: all 0.3s;
    `;
    
    if (isBackendAvailable) {
        indicator.style.background = '#10b981';
        indicator.style.color = 'white';
        indicator.innerHTML = '<i class="fas fa-check-circle"></i> Backend Connected';
        indicator.title = 'Using MongoDB database';
        console.log('✅ Backend connected - Using MongoDB');
    } else {
        indicator.style.background = '#f59e0b';
        indicator.style.color = 'white';
        indicator.innerHTML = '<i class="fas fa-wifi"></i> Offline Mode';
        indicator.title = 'Using localStorage (offline mode)';
        console.log('⚠️ Backend offline - Using localStorage');
    }
    
    indicator.addEventListener('mouseenter', () => {
        indicator.style.transform = 'scale(1.05)';
    });
    
    indicator.addEventListener('mouseleave', () => {
        indicator.style.transform = 'scale(1)';
    });
    
    document.body.appendChild(indicator);
    
    // Store status globally
    window.BACKEND_CONNECTED = isBackendAvailable;
})();
