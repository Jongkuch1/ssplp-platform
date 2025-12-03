// Profile Management
document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    if (!user.id && !user.email) {
        window.location.href = 'login.html';
        return;
    }

    loadProfile();
    
    // Make sure edit button works
    const editBtn = document.getElementById('editBtn');
    if (editBtn) {
        editBtn.onclick = toggleEdit;
    }
});

function loadProfile() {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    if (!user.name) {
        console.error('No user data found');
        return;
    }
    
    document.getElementById('userName').textContent = user.name;
    document.getElementById('userEmail').textContent = user.email;
    document.getElementById('userRole').textContent = user.role.toUpperCase();
    
    const profilePic = document.getElementById('profilePicture');
    if (profilePic) {
        profilePic.src = user.profilePicture || 'https://via.placeholder.com/150';
    }
    
    const nameParts = user.name.split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';
    
    const firstNameEl = document.getElementById('firstName');
    const lastNameEl = document.getElementById('lastName');
    const emailEl = document.getElementById('email');
    const roleEl = document.getElementById('role');
    const phoneEl = document.getElementById('phone');
    const facebookEl = document.getElementById('facebook');
    const twitterEl = document.getElementById('twitter');
    const linkedinEl = document.getElementById('linkedin');
    
    if (firstNameEl) firstNameEl.textContent = firstName;
    if (lastNameEl) lastNameEl.textContent = lastName || '';
    if (emailEl) emailEl.textContent = user.email;
    if (roleEl) roleEl.textContent = user.role;
    if (phoneEl) phoneEl.textContent = user.phone || 'Not set';
    
    const biographyEl = document.getElementById('biography');
    if (biographyEl) biographyEl.textContent = user.biography || 'Share your knowledge and experiences to help others learn.';
    
    const noLinksEl = document.getElementById('noLinks');
    let hasLinks = false;
    
    if (user.facebook) {
        if (facebookEl) facebookEl.textContent = user.facebook;
        if (facebookEl) facebookEl.href = user.facebook.startsWith('http') ? user.facebook : 'https://' + user.facebook;
        document.getElementById('facebookLink').style.display = 'block';
        hasLinks = true;
    }
    if (user.twitter) {
        if (twitterEl) twitterEl.textContent = user.twitter;
        if (twitterEl) twitterEl.href = user.twitter.startsWith('http') ? user.twitter : 'https://' + user.twitter;
        document.getElementById('twitterLink').style.display = 'block';
        hasLinks = true;
    }
    if (user.linkedin) {
        if (linkedinEl) linkedinEl.textContent = user.linkedin;
        if (linkedinEl) linkedinEl.href = user.linkedin.startsWith('http') ? user.linkedin : 'https://' + user.linkedin;
        document.getElementById('linkedinLink').style.display = 'block';
        hasLinks = true;
    }
    
    if (noLinksEl) noLinksEl.style.display = hasLinks ? 'none' : 'block';
    
    if (user.role === 'student') {
        document.getElementById('gradeInfo').style.display = 'block';
        document.getElementById('grade').textContent = user.grade || 'Not set';
        document.getElementById('editGradeGroup').style.display = 'block';
    }
    
    setupProfilePicUpload();
    loadStats(user);
}

function setupProfilePicUpload() {
    const picInput = document.getElementById('profilePicInput');
    const picBtn = document.getElementById('uploadPicBtn');
    
    if (picBtn && picInput) {
        picBtn.onclick = (e) => {
            e.preventDefault();
            picInput.click();
        };
        picInput.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                if (file.size > 5000000) {
                    alert('Image size should be less than 5MB');
                    return;
                }
                const reader = new FileReader();
                reader.onload = (event) => {
                    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
                    user.profilePicture = event.target.result;
                    updateUser(user);
                    document.getElementById('profilePicture').src = event.target.result;
                    alert('Profile picture updated!');
                };
                reader.readAsDataURL(file);
            }
        };
    }
}

function updateUser(user) {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
        users[userIndex] = user;
        localStorage.setItem('users', JSON.stringify(users));
    }
    localStorage.setItem('currentUser', JSON.stringify(user));
}

function loadStats(user) {
    const statsContainer = document.getElementById('userStats');
    
    if (user.role === 'student') {
        const bookings = JSON.parse(localStorage.getItem('bookings') || '[]')
            .filter(b => b.studentId === user.id);
        const downloads = JSON.parse(localStorage.getItem('downloadedAssets') || '[]')
            .filter(d => d.studentId === user.id);
        
        statsContainer.innerHTML = `
            <div class="info-item"><strong>Sessions Booked:</strong> ${bookings.length}</div>
            <div class="info-item"><strong>Downloads:</strong> ${downloads.length}</div>
            <div class="info-item"><strong>Member Since:</strong> ${new Date(user.createdAt).toLocaleDateString()}</div>
        `;
    } else if (user.role === 'teacher') {
        const meetings = JSON.parse(localStorage.getItem('scheduledMeetings') || '[]')
            .filter(m => m.teacherId === user.id);
        
        statsContainer.innerHTML = `
            <div class="info-item"><strong>Subjects:</strong> ${(user.subjects || []).join(', ') || 'Not assigned'}</div>
            <div class="info-item"><strong>Meetings Scheduled:</strong> ${meetings.length}</div>
            <div class="info-item"><strong>Member Since:</strong> ${new Date(user.createdAt).toLocaleDateString()}</div>
        `;
    } else {
        statsContainer.innerHTML = `
            <div class="info-item"><strong>Role:</strong> Administrator</div>
            <div class="info-item"><strong>Member Since:</strong> ${new Date(user.createdAt).toLocaleDateString()}</div>
        `;
    }
}

function toggleEdit() {
    const viewMode = document.getElementById('viewMode');
    const editMode = document.getElementById('editMode');
    const editBtn = document.getElementById('editBtn');
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    if (viewMode.style.display === 'none') {
        viewMode.style.display = 'block';
        editMode.style.display = 'none';
        if (editBtn) editBtn.innerHTML = '<i class="fas fa-edit"></i> Edit Profile';
    } else {
        const nameParts = user.name.split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';
        
        document.getElementById('editFirstName').value = firstName;
        document.getElementById('editLastName').value = lastName;
        document.getElementById('editEmail').value = user.email;
        document.getElementById('editPhone').value = user.phone || '';
        document.getElementById('editBiography').value = user.biography || '';
        document.getElementById('editFacebook').value = user.facebook || '';
        document.getElementById('editTwitter').value = user.twitter || '';
        document.getElementById('editLinkedin').value = user.linkedin || '';
        if (user.role === 'student') {
            const gradeGroup = document.getElementById('editGradeGroup');
            if (gradeGroup) gradeGroup.style.display = 'block';
            document.getElementById('editGrade').value = user.grade || '10';
        }
        
        viewMode.style.display = 'none';
        editMode.style.display = 'block';
        if (editBtn) editBtn.innerHTML = '<i class="fas fa-times"></i> Cancel';
    }
}

document.getElementById('editMode').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const firstName = document.getElementById('editFirstName').value.trim();
    const lastName = document.getElementById('editLastName').value.trim();
    const name = `${firstName} ${lastName}`.trim();
    
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
        users[userIndex].name = name;
        users[userIndex].email = document.getElementById('editEmail').value.trim();
        users[userIndex].phone = document.getElementById('editPhone').value.trim();
        users[userIndex].biography = document.getElementById('editBiography').value.trim();
        users[userIndex].facebook = document.getElementById('editFacebook').value.trim();
        users[userIndex].twitter = document.getElementById('editTwitter').value.trim();
        users[userIndex].linkedin = document.getElementById('editLinkedin').value.trim();
        
        if (currentUser.role === 'student') {
            users[userIndex].grade = document.getElementById('editGrade').value;
        }
        
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(users[userIndex]));
        
        alert('Profile updated successfully!');
        loadProfile();
        toggleEdit();
    }
});
