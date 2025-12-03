// Content Management Logic
document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (!currentUser.email || (currentUser.role !== 'teacher' && currentUser.role !== 'admin')) {
        window.location.href = 'login.html';
        return;
    }

    loadSubjects();
    loadContent();
    
    document.getElementById('uploadForm').addEventListener('submit', handleUpload);
});

function loadSubjects() {
    const subjects = [
        'Mathematics', 'English', 'Physics', 'Chemistry', 'Biology',
        'Agriculture', 'Additional Mathematics', 'ICT', 'History',
        'Geography', 'Commerce', 'Accounting', 'Literature', 'CRE', 'Citizenship'
    ];
    
    const select = document.getElementById('contentSubject');
    select.innerHTML = '<option value="">Select Subject</option>' + 
        subjects.map(s => `<option value="${s}">${s}</option>`).join('');
}

function handleUpload(e) {
    e.preventDefault();
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const content = {
        id: Date.now(),
        subject: document.getElementById('contentSubject').value,
        title: document.getElementById('contentTitle').value,
        type: document.getElementById('contentType').value,
        description: document.getElementById('contentDescription').value,
        uploadedBy: currentUser.email,
        uploadDate: new Date().toISOString()
    };
    
    let allContent = JSON.parse(localStorage.getItem('platformContent') || '[]');
    allContent.push(content);
    localStorage.setItem('platformContent', JSON.stringify(allContent));
    
    // Update teacher stats
    let teacherData = JSON.parse(localStorage.getItem('teacherData') || '{}');
    if (!teacherData[currentUser.email]) {
        teacherData[currentUser.email] = { contentCreated: 0, quizzesCreated: 0 };
    }
    teacherData[currentUser.email].contentCreated++;
    localStorage.setItem('teacherData', JSON.stringify(teacherData));
    
    alert('Content uploaded successfully!');
    e.target.reset();
    loadContent();
}

function loadContent() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const allContent = JSON.parse(localStorage.getItem('platformContent') || '[]');
    const myContent = currentUser.role === 'admin' 
        ? allContent 
        : allContent.filter(c => c.uploadedBy === currentUser.email);
    
    const container = document.getElementById('contentList');
    
    if (myContent.length === 0) {
        container.innerHTML = '<p style="color: #64748b;">No content uploaded yet</p>';
        return;
    }
    
    container.innerHTML = myContent.map(content => `
        <div class="content-item">
            <div>
                <strong>${content.title}</strong>
                <p style="margin: 5px 0; color: #64748b;">${content.subject} - ${content.type}</p>
                <small>${new Date(content.uploadDate).toLocaleDateString()}</small>
            </div>
            <button class="btn btn-sm" onclick="deleteContent(${content.id})" style="background: #ef4444; color: white;">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
}

function deleteContent(id) {
    if (!confirm('Delete this content?')) return;
    
    let allContent = JSON.parse(localStorage.getItem('platformContent') || '[]');
    allContent = allContent.filter(c => c.id !== id);
    localStorage.setItem('platformContent', JSON.stringify(allContent));
    loadContent();
}
