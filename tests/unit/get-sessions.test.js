// @vitest-environment jsdom

import { describe, it, expect, vi, beforeEach } from 'vitest';
import getSessions from '../../src/scripts/api/get-sessions.js';

describe('getSessions', () => {

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should return an array of sessions from localStorage', () => {
    const mockSessions = ['token-abc123', 'token-xyz456'];

    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify(mockSessions));

    const result = getSessions();

    expect(result).toEqual(mockSessions);
    expect(Array.isArray(result)).toBe(true);
  });

  it('should return an empty array if localStorage is empty', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);

    const result = getSessions();

    expect(result).toEqual([]);
  });

  it('should return an empty array if sessions value is an empty string', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('');

    const result = getSessions();

    expect(result).toEqual([]);
  });

});