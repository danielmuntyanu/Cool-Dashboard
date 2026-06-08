// login-utils.test.js
import { describe, it, expect } from 'vitest';
import { validateLoginForm, findAccount } from '../../src/scripts/components/login-utils.js';

describe('validateLoginForm', () => {

    it('should throw if username is empty', () => {
        expect(() => validateLoginForm('', 'password1')).toThrow('* All fields are required.');
    });

    it('should throw if password is empty', () => {
        expect(() => validateLoginForm('user@example.com', '')).toThrow('* All fields are required.');
    });

    it('should throw if email is invalid', () => {
        expect(() => validateLoginForm('notanemail', 'password1')).toThrow('* Invalid email address');
    });

    it('should throw if password has no numbers', () => {
        expect(() => validateLoginForm('user@example.com', 'password')).toThrow('* Password must be at least 8 characters');
    });

    it('should throw if password is shorter than 8 characters', () => {
        expect(() => validateLoginForm('user@example.com', 'pass1')).toThrow('* Password must be at least 8 characters');
    });

    it('should not throw if username and password are valid', () => {
        expect(() => validateLoginForm('user@example.com', 'password1')).not.toThrow();
    });

});

describe('findAccount', () => {

    const mockAccounts = [
        { email: 'user@example.com', password: 'password1' },
        { email: 'admin@example.com', password: 'admin1234' },
    ];

    it('should return account if credentials match', () => {
        const result = findAccount(mockAccounts, 'user@example.com', 'password1');
        expect(result).toEqual({ email: 'user@example.com', password: 'password1' });
    });

    it('should return null if email does not match', () => {
        const result = findAccount(mockAccounts, 'wrong@example.com', 'password1');
        expect(result).toBeNull();
    });

    it('should return null if password does not match', () => {
        const result = findAccount(mockAccounts, 'user@example.com', 'wrongpass1');
        expect(result).toBeNull();
    });

    it('should return null if account list is empty', () => {
        const result = findAccount([], 'user@example.com', 'password1');
        expect(result).toBeNull();
    });

});