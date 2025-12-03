// Load profile picture on all pages
function loadProfilePicture() {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const profileBtn = document.getElementById('profileBtn');
    
    if (profileBtn && user.name) {
        // Find or create profile pic div
        let profilePicDiv = profileBtn.querySelector('.profile-pic-nav');
        const icon = profileBtn.querySelector('i.fa-user');
        
        if (!profilePicDiv && icon) {
            profilePicDiv = document.createElement('div');
            profilePicDiv.className = 'profile-pic-nav';
            profilePicDiv.style.cssText = 'width: 32px; height: 32px; border-radius: 50%; background: #6d28d9; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px; flex-shrink: 0;';
            icon.parentNode.insertBefore(profilePicDiv, icon);
            icon.style.display = 'none';
        }
        
        if (profilePicDiv) {
            if (user.profilePic) {
                profilePicDiv.innerHTML = `<img src="${user.profilePic}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">`;
            } else {
                const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
                profilePicDiv.textContent = initials;
                profilePicDiv.innerHTML = initials;
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', loadProfilePicture);

// Reload on visibility change (when returning from profile page)
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        loadProfilePicture();
    }
});
