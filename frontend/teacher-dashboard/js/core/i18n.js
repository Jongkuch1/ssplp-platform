// Multi-language support (FR08)
const translations = {
    en: {
        // Navigation
        home: 'Home',
        features: 'Features',
        about: 'About',
        contact: 'Contact',
        signIn: 'Sign In',
        logout: 'Logout',
        profile: 'Profile',
        
        // Dashboard
        welcome: 'Welcome',
        welcomeBack: 'Welcome back',
        dashboard: 'Dashboard',
        subjects: 'Subjects',
        quizzes: 'Quizzes',
        tutoring: 'Tutoring',
        messages: 'Messages',
        progress: 'Progress',
        
        // Stats
        totalStudents: 'Total Students',
        activeStudents: 'Active Students',
        classAverage: 'Class Average',
        totalCourses: 'Total Courses',
        overallProgress: 'Overall Progress',
        timeSpent: 'Time Spent Today',
        downloadedMaterials: 'Downloaded Materials',
        upcomingSessions: 'Upcoming Sessions',
        
        // Actions
        quickActions: 'Quick Actions',
        scheduleMeeting: 'Schedule Meeting',
        createCourse: 'Create Course',
        createAssignment: 'Create Assignment',
        createQuiz: 'Create Quiz',
        uploadResources: 'Upload Resources',
        gradeSubmissions: 'Grade Submissions',
        viewStudents: 'View Students',
        viewAnalytics: 'View Analytics',
        viewSessions: 'View Sessions',
        downloadMaterials: 'Download Materials',
        askForHelp: 'Ask for Help',
        viewSubjects: 'View Subjects',
        takeQuiz: 'Take Quiz',
        checkProgress: 'Check Progress',
        
        // Teacher dashboard
        courses: 'Courses',
        assignments: 'Assignments',
        students: 'Students',
        analytics: 'Analytics',
        welcomeBackTeacher: 'Welcome back',
        manageCoursesDesc: 'Manage your courses, grade assignments, and check on your students',
        yourUpcomingSessions: 'Your Upcoming Sessions',
        assignmentsToGrade: 'Assignments to Grade',
        noPendingSubmissions: 'No pending submissions',
        yourContent: 'Your Content',
        
        // Admin dashboard
        users: 'Users',
        contentApproval: 'Content Approval',
        reports: 'Reports',
        systemSettings: 'System Settings',
        welcomeAdmin: 'Welcome',
        managePlatformDesc: 'Manage users, approve content, and keep the platform running smoothly',
        totalUsers: 'Total Users',
        activeUsers: 'Active Users',
        systemUptime: 'System Uptime',
        pendingApprovals: 'Pending Approvals',
        recentSecurityAlerts: 'Recent Security Alerts',
        noSecurityAlerts: 'No security alerts',
        systemPerformance: 'System Performance',
        requestsPerHour: 'Requests/Hour',
        avgResponseTime: 'Avg Response Time',
        errorRate: 'Error Rate',
        concurrentUsers: 'Concurrent Users',
        uptime: 'Uptime',
        adminActions: 'Admin Actions',
        manageUsers: 'Manage Users',
        assignSubjects: 'Assign Subjects',
        approveContent: 'Approve Content',
        generateReports: 'Generate Reports',
        securityAudit: 'Security Audit',
        systemInfo: 'System Info',
        version: 'Version',
        status: 'Status',
        running: 'Running',
        builtWith: 'Built with',
        storage: 'Storage',
        browserStorage: 'Browser (LocalStorage)',
        offline: 'Offline',
        yes: 'Yes',
        
        // Login/Register
        backToHome: 'Back to Home',
        welcomeBack: 'Welcome Back',
        signInToAccount: 'Sign in to your account',
        emailAddress: 'Email Address',
        password: 'Password',
        demoAccounts: 'Demo Accounts',
        join: 'Join',
        mathematics: 'Mathematics',
        english: 'English',
        
        // Dashboard content
        suggestedLessons: 'Suggested Lessons',
        yourUpcomingSessions: 'Your Upcoming Sessions',
        downloadedContent: 'Downloaded Content',
        continueLearningSuggestion: 'Continue learning to improve',
        start: 'Start',
        noUpcomingSessions: 'No upcoming sessions.',
        bookSession: 'Book a session',
        noDownloadedContent: 'No downloaded content yet.',
        downloadMaterialsLink: 'Download materials',
        whatsAvailable: "What's Available",
        subjectsToStudy: '15 Subjects to Study',
        downloadOffline: 'Download for Offline Use',
        trackYourProgress: 'Track Your Progress',
        pickUpWhereLeft: 'Pick up where you left off or start something new',
        
        // Common
        save: 'Save',
        cancel: 'Cancel',
        edit: 'Edit',
        delete: 'Delete',
        submit: 'Submit',
        back: 'Back',
        next: 'Next',
        loading: 'Loading...',
        noData: 'No data available',
        
        // Profile
        personalInfo: 'Personal Information',
        editProfile: 'Edit Profile',
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email',
        role: 'Role',
        grade: 'Grade',
        saveChanges: 'Save Changes',
        
        // Auth
        createAccount: 'Create Your Account',
        signUpFree: 'Sign up free and start learning today',
        alreadyHaveAccount: 'Already have an account?',
        signInHere: 'Sign in here',
        dontHaveAccount: "Don't have an account?",
        signUpHere: 'Sign up here',
        
        // Roles
        student: 'Student',
        teacher: 'Teacher',
        admin: 'Admin',
        
        // Landing page
        learnBetter: 'Learn Better.',
        achieveMore: 'Achieve More.',
        heroDescription: "Study at your own pace with lessons that match South Sudan's curriculum. Works offline too.",
        getStarted: 'Get Started',
        whatYouGet: 'What You Get',
        smartRecommendations: 'Smart Recommendations',
        smartRecommendationsDesc: "Get lesson suggestions based on what you're learning and how you're doing.",
        onlineTutoring: 'Online Tutoring',
        onlineTutoringDesc: 'Book one-on-one or group sessions with teachers when you need help.',
        worksOffline: 'Works Offline',
        worksOfflineDesc: 'Download lessons and study without internet. Perfect for areas with poor connection.',
        gettingStarted: 'Getting Started is Easy',
        signUpStep: '1. Sign Up',
        signUpDesc: 'Create your free account as a student or teacher in under a minute.',
        startLearning: '2. Start Learning',
        startLearningDesc: 'Browse subjects, take quizzes, and book tutoring sessions.',
        trackProgressStep: '3. Track Progress',
        trackProgressDesc: "See how you're improving with simple charts and reports.",
        whatPeopleSay: 'What People Are Saying',
        readyToStart: 'Ready to start?',
        joinNow: 'Join students and teachers already using SSPLP to learn better.',
        joinAsStudent: 'Join as Student',
        joinAsTeacher: 'Join as Teacher',
        aboutSSPLP: 'About SSPLP',
        aboutDesc: 'Making quality education accessible to students across South Sudan, online and offline.',
        quickLinks: 'Quick Links',
        resources: 'Resources',
        allRightsReserved: 'All Rights Reserved'
    },
    ar: {
        // Navigation
        home: 'الرئيسية',
        features: 'المميزات',
        about: 'حول',
        contact: 'اتصل',
        signIn: 'تسجيل الدخول',
        logout: 'تسجيل الخروج',
        profile: 'الملف الشخصي',
        
        // Dashboard
        welcome: 'مرحبا',
        welcomeBack: 'مرحبا بعودتك',
        dashboard: 'لوحة التحكم',
        subjects: 'المواد',
        quizzes: 'الاختبارات',
        tutoring: 'التدريس',
        messages: 'الرسائل',
        progress: 'التقدم',
        
        // Stats
        totalStudents: 'إجمالي الطلاب',
        activeStudents: 'الطلاب النشطون',
        classAverage: 'متوسط الفصل',
        totalCourses: 'إجمالي الدورات',
        overallProgress: 'التقدم الإجمالي',
        timeSpent: 'الوقت المستغرق اليوم',
        downloadedMaterials: 'المواد المحملة',
        upcomingSessions: 'الجلسات القادمة',
        
        // Actions
        quickActions: 'إجراءات سريعة',
        scheduleMeeting: 'جدولة اجتماع',
        createCourse: 'إنشاء دورة',
        createAssignment: 'إنشاء واجب',
        createQuiz: 'إنشاء اختبار',
        uploadResources: 'تحميل الموارد',
        gradeSubmissions: 'تقييم التقديمات',
        viewStudents: 'عرض الطلاب',
        viewAnalytics: 'عرض التحليلات',
        viewSessions: 'عرض الجلسات',
        downloadMaterials: 'تحميل المواد',
        askForHelp: 'اطلب المساعدة',
        viewSubjects: 'عرض المواد',
        takeQuiz: 'خذ اختبار',
        checkProgress: 'تحقق من التقدم',
        
        // Teacher dashboard
        courses: 'الدورات',
        assignments: 'الواجبات',
        students: 'الطلاب',
        analytics: 'التحليلات',
        welcomeBackTeacher: 'مرحبا بعودتك',
        manageCoursesDesc: 'إدارة دوراتك وتقييم الواجبات ومتابعة طلابك',
        yourUpcomingSessions: 'جلساتك القادمة',
        assignmentsToGrade: 'الواجبات للتقييم',
        noPendingSubmissions: 'لا توجد تقديمات معلقة',
        yourContent: 'محتواك',
        
        // Admin dashboard
        users: 'المستخدمون',
        contentApproval: 'الموافقة على المحتوى',
        reports: 'التقارير',
        systemSettings: 'إعدادات النظام',
        welcomeAdmin: 'مرحبا',
        managePlatformDesc: 'إدارة المستخدمين والموافقة على المحتوى والحفاظ على تشغيل المنصة بسلاسة',
        totalUsers: 'إجمالي المستخدمين',
        activeUsers: 'المستخدمون النشطون',
        systemUptime: 'وقت تشغيل النظام',
        pendingApprovals: 'الموافقات المعلقة',
        recentSecurityAlerts: 'تنبيهات الأمان الأخيرة',
        noSecurityAlerts: 'لا توجد تنبيهات أمنية',
        systemPerformance: 'أداء النظام',
        requestsPerHour: 'الطلبات/الساعة',
        avgResponseTime: 'متوسط وقت الاستجابة',
        errorRate: 'معدل الخطأ',
        concurrentUsers: 'المستخدمون المتزامنون',
        uptime: 'وقت التشغيل',
        adminActions: 'إجراءات المسؤول',
        manageUsers: 'إدارة المستخدمين',
        assignSubjects: 'تعيين المواد',
        approveContent: 'الموافقة على المحتوى',
        generateReports: 'إنشاء التقارير',
        securityAudit: 'تدقيق الأمان',
        systemInfo: 'معلومات النظام',
        version: 'الإصدار',
        status: 'الحالة',
        running: 'قيد التشغيل',
        builtWith: 'مبني باستخدام',
        storage: 'التخزين',
        browserStorage: 'المتصفح (LocalStorage)',
        offline: 'غير متصل',
        yes: 'نعم',
        
        // Login/Register
        backToHome: 'العودة إلى الرئيسية',
        welcomeBack: 'مرحبا بعودتك',
        signInToAccount: 'سجل الدخول إلى حسابك',
        emailAddress: 'عنوان البريد الإلكتروني',
        password: 'كلمة المرور',
        demoAccounts: 'حسابات تجريبية',
        join: 'انضم',
        mathematics: 'الرياضيات',
        english: 'الإنجليزية',
        
        // Dashboard content
        suggestedLessons: 'الدروس المقترحة',
        yourUpcomingSessions: 'جلساتك القادمة',
        downloadedContent: 'المحتوى المحمل',
        continueLearningSuggestion: 'استمر في التعلم للتحسين',
        start: 'ابدأ',
        noUpcomingSessions: 'لا توجد جلسات قادمة.',
        bookSession: 'احجز جلسة',
        noDownloadedContent: 'لا يوجد محتوى محمل بعد.',
        downloadMaterialsLink: 'تحميل المواد',
        whatsAvailable: 'ما هو المتاح',
        subjectsToStudy: '15 مادة للدراسة',
        downloadOffline: 'تحميل للاستخدام بدون إنترنت',
        trackYourProgress: 'تتبع تقدمك',
        pickUpWhereLeft: 'استمر من حيث توقفت أو ابدأ شيئًا جديدًا',
        
        // Common
        save: 'حفظ',
        cancel: 'إلغاء',
        edit: 'تعديل',
        delete: 'حذف',
        submit: 'إرسال',
        back: 'رجوع',
        next: 'التالي',
        loading: 'جاري التحميل...',
        noData: 'لا توجد بيانات',
        
        // Profile
        personalInfo: 'المعلومات الشخصية',
        editProfile: 'تعديل الملف الشخصي',
        firstName: 'الاسم الأول',
        lastName: 'اسم العائلة',
        email: 'البريد الإلكتروني',
        role: 'الدور',
        grade: 'الصف',
        saveChanges: 'حفظ التغييرات',
        
        // Auth
        createAccount: 'إنشاء حسابك',
        signUpFree: 'سجل مجانا وابدأ التعلم اليوم',
        alreadyHaveAccount: 'هل لديك حساب؟',
        signInHere: 'سجل الدخول هنا',
        dontHaveAccount: 'ليس لديك حساب؟',
        signUpHere: 'سجل هنا',
        
        // Roles
        student: 'طالب',
        teacher: 'معلم',
        admin: 'مسؤول',
        
        // Landing page
        learnBetter: 'تعلم بشكل أفضل.',
        achieveMore: 'حقق المزيد.',
        heroDescription: 'ادرس بالسرعة التي تناسبك مع دروس تتوافق مع منهج جنوب السودان. يعمل بدون إنترنت أيضًا.',
        getStarted: 'ابدأ الآن',
        whatYouGet: 'ما ستحصل عليه',
        smartRecommendations: 'توصيات ذكية',
        smartRecommendationsDesc: 'احصل على اقتراحات الدروس بناءً على ما تتعلمه وكيف تتقدم.',
        onlineTutoring: 'التدريس عبر الإنترنت',
        onlineTutoringDesc: 'احجز جلسات فردية أو جماعية مع المعلمين عندما تحتاج إلى مساعدة.',
        worksOffline: 'يعمل بدون إنترنت',
        worksOfflineDesc: 'قم بتنزيل الدروس والدراسة بدون إنترنت. مثالي للمناطق ذات الاتصال الضعيف.',
        gettingStarted: 'البدء سهل',
        signUpStep: '١. التسجيل',
        signUpDesc: 'أنشئ حسابك المجاني كطالب أو معلم في أقل من دقيقة.',
        startLearning: '٢. ابدأ التعلم',
        startLearningDesc: 'تصفح المواد، وخذ الاختبارات، واحجز جلسات التدريس.',
        trackProgressStep: '٣. تتبع التقدم',
        trackProgressDesc: 'شاهد كيف تتحسن مع الرسوم البيانية والتقارير البسيطة.',
        whatPeopleSay: 'ماذا يقول الناس',
        readyToStart: 'هل أنت مستعد للبدء؟',
        joinNow: 'انضم إلى الطلاب والمعلمين الذين يستخدمون SSPLP للتعلم بشكل أفضل.',
        joinAsStudent: 'انضم كطالب',
        joinAsTeacher: 'انضم كمعلم',
        aboutSSPLP: 'حول SSPLP',
        aboutDesc: 'جعل التعليم الجيد متاحًا للطلاب في جميع أنحاء جنوب السودان، عبر الإنترنت وبدونه.',
        quickLinks: 'روابط سريعة',
        resources: 'الموارد',
        allRightsReserved: 'جميع الحقوق محفوظة'
    }
};

// Get current language
function getCurrentLanguage() {
    return localStorage.getItem('language') || 'en';
}

// Set language
function setLanguage(lang) {
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    // Don't change dir to prevent layout shift
    translatePage();
    
    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        }
    });
}

// Translate page
function translatePage() {
    const lang = getCurrentLanguage();
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translations[lang][key];
            } else {
                el.textContent = translations[lang][key];
            }
        }
    });
}

// Translate role
function translateRole(role) {
    const lang = getCurrentLanguage();
    const roleKey = role.toLowerCase();
    return translations[lang] && translations[lang][roleKey] ? translations[lang][roleKey] : role;
}

// Get translation
function t(key) {
    const lang = getCurrentLanguage();
    return translations[lang] && translations[lang][key] ? translations[lang][key] : key;
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
    const lang = getCurrentLanguage();
    document.documentElement.lang = lang;
    translatePage();
    
    // Update language switcher if exists
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        }
    });
    
    // Translate user role if displayed
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (user.role) {
        const roleElements = document.querySelectorAll('[data-role]');
        roleElements.forEach(el => {
            if (el.dataset.role === user.role) {
                el.textContent = translateRole(user.role);
            }
        });
    }
});
