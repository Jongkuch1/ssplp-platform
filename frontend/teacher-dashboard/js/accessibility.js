// Accessibility Features (NFR03 - WCAG 2.1 AA)

class AccessibilityManager {
    constructor() {
        this.init();
    }

    init() {
        this.addSkipLinks();
        this.enhanceKeyboardNavigation();
        this.addAriaLabels();
        this.setupFocusManagement();
        this.addTextResizing();
        this.addHighContrastMode();
    }

    addSkipLinks() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Skip to main content';
        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    enhanceKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-nav');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-nav');
        });
    }

    addAriaLabels() {
        document.querySelectorAll('button:not([aria-label])').forEach(btn => {
            if (!btn.textContent.trim()) {
                btn.setAttribute('aria-label', 'Button');
            }
        });

        document.querySelectorAll('a:not([aria-label])').forEach(link => {
            if (!link.textContent.trim() && link.querySelector('i')) {
                link.setAttribute('aria-label', 'Link');
            }
        });

        document.querySelectorAll('input:not([aria-label])').forEach(input => {
            const label = input.previousElementSibling;
            if (label && label.tagName === 'LABEL') {
                input.setAttribute('aria-labelledby', label.id || 'label-' + Date.now());
            }
        });
    }

    setupFocusManagement() {
        const focusableElements = 'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])';
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const modal = document.querySelector('.notification-modal, .modal');
                if (modal) {
                    modal.remove();
                }
            }
        });
    }

    addTextResizing() {
        // Text resizing controls removed - not needed on landing page
    }

    changeTextSize(action) {
        const root = document.documentElement;
        const currentSize = parseFloat(getComputedStyle(root).fontSize);
        
        if (action === 'increase' && currentSize < 20) {
            root.style.fontSize = (currentSize + 1) + 'px';
        } else if (action === 'decrease' && currentSize > 14) {
            root.style.fontSize = (currentSize - 1) + 'px';
        }
        
        localStorage.setItem('fontSize', root.style.fontSize);
    }

    resetTextSize() {
        document.documentElement.style.fontSize = '16px';
        localStorage.setItem('fontSize', '16px');
    }

    addHighContrastMode() {
        const savedContrast = localStorage.getItem('highContrast');
        if (savedContrast === 'true') {
            document.body.classList.add('high-contrast');
        }
    }

    toggleHighContrast() {
        document.body.classList.toggle('high-contrast');
        localStorage.setItem('highContrast', document.body.classList.contains('high-contrast'));
    }

    announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', 'polite');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        document.body.appendChild(announcement);
        setTimeout(() => announcement.remove(), 1000);
    }
}

const accessibilityManager = new AccessibilityManager();

document.addEventListener('DOMContentLoaded', () => {
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
        document.documentElement.style.fontSize = savedFontSize;
    }
});
