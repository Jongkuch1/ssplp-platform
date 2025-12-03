// Multi-Language Support (FR08)
const translations = {
    en: {
        home: 'Home',
        features: 'Features',
        about: 'About',
        signIn: 'Sign In',
        getStarted: 'Get Started',
        dashboard: 'Dashboard',
        subjects: 'Subjects',
        quizzes: 'Quizzes',
        tutoring: 'Tutoring',
        progress: 'Progress',
        profile: 'Profile',
        logout: 'Logout',
        courses: 'Courses',
        assignments: 'Assignments',
        students: 'Students',
        analytics: 'Analytics',
        users: 'Users',
        contentApproval: 'Content Approval',
        reports: 'Reports',
        systemSettings: 'System Settings',
        welcome: 'Welcome',
        student: 'Student',
        teacher: 'Teacher',
        admin: 'Administrator'
    },
    ar: {
        home: 'الرئيسية',
        features: 'المميزات',
        about: 'حول',
        signIn: 'تسجيل الدخول',
        getStarted: 'ابدأ الآن',
        dashboard: 'لوحة التحكم',
        subjects: 'المواد',
        quizzes: 'الاختبارات',
        tutoring: 'التدريس',
        progress: 'التقدم',
        profile: 'الملف الشخصي',
        logout: 'تسجيل الخروج',
        courses: 'الدورات',
        assignments: 'الواجبات',
        students: 'الطلاب',
        analytics: 'التحليلات',
        users: 'المستخدمون',
        contentApproval: 'الموافقة على المحتوى',
        reports: 'التقارير',
        systemSettings: 'إعدادات النظام',
        welcome: 'مرحبا',
        student: 'طالب',
        teacher: 'معلم',
        admin: 'مدير'
    }
};

// Full page content translations
const pageContent = {
    en: {
        heroTitle: 'SSPLP',
        heroSubtitle: 'Empowering Education. Building Futures.',
        heroDescription: "SSPLP provides personalized, accessible, and high-quality learning resources aligned with South Sudan's national curriculum."
    },
    ar: {
        heroTitle: 'SSPLP',
        heroSubtitle: 'تمكين التعليم. بناء المستقبل.',
        heroDescription: 'توفر SSPLP موارد تعليمية شخصية ومتاحة وعالية الجودة متوافقة مع المنهج الوطني لجنوب السودان.'
    }
};

function getCurrentLanguage() {
    return localStorage.getItem('language') || 'en';
}

function setLanguage(lang) {
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    
    applyTranslations();
    
    // Update active button
    document.querySelectorAll('.language-switcher button').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.language-switcher button[onclick="setLanguage('${lang}')"]`)?.classList.add('active');
}

function applyTranslations() {
    const lang = getCurrentLanguage();
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(el => {
        const key = el.getAttribute('data-translate');
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
    
    // Apply page content translations
    const heroSubtitle = document.querySelector('.hero-text h2');
    const heroDesc = document.querySelector('.hero-text .description');
    
    if (heroSubtitle && pageContent[lang]) {
        heroSubtitle.textContent = pageContent[lang].heroSubtitle;
    }
    if (heroDesc && pageContent[lang]) {
        heroDesc.textContent = pageContent[lang].heroDescription;
    }
}

function createLanguageSwitcher() {
    const currentLang = getCurrentLanguage();
    const switcher = document.createElement('div');
    switcher.className = 'language-switcher';
    switcher.innerHTML = `
        <button onclick="setLanguage('en')" class="${currentLang === 'en' ? 'active' : ''}">EN</button>
        <button onclick="setLanguage('ar')" class="${currentLang === 'ar' ? 'active' : ''}">AR</button>
    `;
    return switcher;
}

document.addEventListener('DOMContentLoaded', function() {
    applyTranslations();
    // Keep LTR direction always
    document.documentElement.dir = 'ltr';
    // Language switcher removed to prevent navigation conflicts
});
