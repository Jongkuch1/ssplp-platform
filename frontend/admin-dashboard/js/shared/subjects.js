// 15 subjects aligned with South Sudan National Curriculum
const subjects = [
    // Compulsory Subjects
    { id: 1, name: 'English', icon: 'book', category: 'Compulsory', description: 'Grammar, Literature, Writing' },
    { id: 2, name: 'CRE', icon: 'cross', category: 'Compulsory', description: 'Christian Religious Education' },
    { id: 3, name: 'Mathematics', icon: 'calculator', category: 'Compulsory', description: 'Algebra, Geometry, Statistics' },
    { id: 4, name: 'Citizenship', icon: 'flag', category: 'Compulsory', description: 'Civic Education' },
    
    // Art Section
    { id: 5, name: 'History', icon: 'landmark', category: 'Art', description: 'World and Local History' },
    { id: 6, name: 'Geography', icon: 'globe', category: 'Art', description: 'Physical and Human Geography' },
    { id: 7, name: 'Commerce', icon: 'briefcase', category: 'Art', description: 'Business Studies' },
    { id: 8, name: 'Literature', icon: 'book-open', category: 'Art', description: 'English Literature' },
    { id: 9, name: 'Accounting', icon: 'calculator', category: 'Art', description: 'Financial Accounting' },
    
    // Science Section
    { id: 10, name: 'Physics', icon: 'atom', category: 'Science', description: 'Mechanics, Electricity' },
    { id: 11, name: 'Chemistry', icon: 'flask', category: 'Science', description: 'Organic, Inorganic Chemistry' },
    { id: 12, name: 'Biology', icon: 'leaf', category: 'Science', description: 'Life Sciences, Ecology' },
    { id: 13, name: 'Agriculture', icon: 'seedling', category: 'Science', description: 'Crop and Animal Production' },
    { id: 14, name: 'Additional Mathematics', icon: 'square-root-alt', category: 'Science', description: 'Advanced Mathematics' },
    { id: 15, name: 'ICT', icon: 'computer', category: 'Science', description: 'Computer Skills, Programming' }
];

function loadSubjects() {
    const subjectsGrid = document.getElementById('subjectsGrid');
    if (subjectsGrid) {
        const compulsory = subjects.filter(s => s.category === 'Compulsory');
        const art = subjects.filter(s => s.category === 'Art');
        const science = subjects.filter(s => s.category === 'Science');
        
        subjectsGrid.innerHTML = `
            <div class="subject-category">
                <h2>Compulsory Subjects</h2>
                <div class="subjects-grid">
                    ${compulsory.map(subject => `
                        <div class="subject-card" onclick="selectSubject(${subject.id})">
                            <i class="fas fa-${subject.icon}"></i>
                            <h3>${subject.name}</h3>
                            <p>${subject.description}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="subject-category">
                <h2>Art Section</h2>
                <div class="subjects-grid">
                    ${art.map(subject => `
                        <div class="subject-card" onclick="selectSubject(${subject.id})">
                            <i class="fas fa-${subject.icon}"></i>
                            <h3>${subject.name}</h3>
                            <p>${subject.description}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="subject-category">
                <h2>Science Section</h2>
                <div class="subjects-grid">
                    ${science.map(subject => `
                        <div class="subject-card" onclick="selectSubject(${subject.id})">
                            <i class="fas fa-${subject.icon}"></i>
                            <h3>${subject.name}</h3>
                            <p>${subject.description}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
}

function selectSubject(subjectId) {
    const subject = subjects.find(s => s.id === subjectId);
    alert(`Selected ${subject.name}. Learning materials will be available soon!`);
}

if (window.location.pathname.includes('subjects.html')) {
    loadSubjects();
}
