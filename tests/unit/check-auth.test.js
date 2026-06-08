// @vitest-environment jsdom

import { describe, it, expect, vi, beforeEach } from 'vitest';
import checkAuth from '../../src/scripts/components/check-auth.js';

vi.mock('../../src/scripts/api/get-sessions.js', () => ({
  default: vi.fn()
}));

import getSessions from '../../src/scripts/api/get-sessions.js';

describe('checkAuth', () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return true if token exists in sessions', () => {
    const token = 'token-aaa';

    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(token);
    getSessions.mockReturnValue(['token-aaa', 'token-bbb']);

    const result = checkAuth();

    expect(result).toBe(true);
  });

  it('should return false if token is not in sessions', () => {
    const token = 'token-xyz';

    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(token);
    getSessions.mockReturnValue(['token-aaa', 'token-bbb']);

    const result = checkAuth();

    expect(result).toBe(false);
  });

  it('should return false if auth-token is not in localStorage', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);
    getSessions.mockReturnValue(['token-aaa', 'token-bbb']);

    const result = checkAuth();

    expect(result).toBe(false);
  });

  it('should return false if sessions is empty', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('token-aaa');
    getSessions.mockReturnValue([]);

    const result = checkAuth();

    expect(result).toBe(false);
  });

});