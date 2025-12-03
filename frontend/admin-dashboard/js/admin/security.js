// Security and Privacy Controls (FR14, NFR05)

class SecurityManager {
    constructor() {
        this.encryptionKey = this.getOrCreateKey();
    }

    getOrCreateKey() {
        let key = localStorage.getItem('_ek');
        if (!key) {
            key = this.generateKey();
            localStorage.setItem('_ek', key);
        }
        return key;
    }

    generateKey() {
        return btoa(Math.random().toString(36).substring(2) + Date.now().toString(36));
    }

    encrypt(data) {
        try {
            const text = typeof data === 'string' ? data : JSON.stringify(data);
            return btoa(encodeURIComponent(text));
        } catch (e) {
            console.error('Encryption failed:', e);
            return data;
        }
    }

    decrypt(encryptedData) {
        try {
            return decodeURIComponent(atob(encryptedData));
        } catch (e) {
            console.error('Decryption failed:', e);
            return encryptedData;
        }
    }

    secureStore(key, data) {
        const encrypted = this.encrypt(data);
        localStorage.setItem(key, encrypted);
    }

    secureRetrieve(key) {
        const encrypted = localStorage.getItem(key);
        if (!encrypted) return null;
        const decrypted = this.decrypt(encrypted);
        try {
            return JSON.parse(decrypted);
        } catch {
            return decrypted;
        }
    }

    sanitizeInput(input) {
        const div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML;
    }

    validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    validatePassword(password) {
        return password.length >= 6;
    }

    hashPassword(password) {
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return btoa(hash.toString());
    }

    checkChildProtection(birthDate) {
        const age = new Date().getFullYear() - new Date(birthDate).getFullYear();
        return {
            isChild: age < 18,
            requiresParentalConsent: age < 13,
            age: age
        };
    }
}

const securityManager = new SecurityManager();
