// @vitest-environment jsdom

import { describe, it, expect, vi, beforeEach } from 'vitest';
import addSession from '../../src/scripts/api/add-session.js';

describe('addSession', () => {

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should save a new token to auth-token in localStorage', () => {
    const mockToken = 'mock-uuid-1234';
    vi.spyOn(crypto, 'randomUUID').mockReturnValue(mockToken);

    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);

    addSession();

    expect(setItemSpy).toHaveBeenCalledWith('auth-token', mockToken);
  });

  it('should push the new token into existing sessions', () => {
    const mockToken = 'mock-uuid-1234';
    const existingSessions = ['old-token-abc', 'old-token-xyz'];

    vi.spyOn(crypto, 'randomUUID').mockReturnValue(mockToken);
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify(existingSessions));

    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

    addSession();

    expect(setItemSpy).toHaveBeenCalledWith(
      'sessions',
      JSON.stringify([...existingSessions, mockToken])
    );
  });

  it('should create a new sessions array if localStorage is empty', () => {
    const mockToken = 'mock-uuid-1234';

    vi.spyOn(crypto, 'randomUUID').mockReturnValue(mockToken);
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);

    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

    addSession();

    expect(setItemSpy).toHaveBeenCalledWith(
      'sessions',
      JSON.stringify([mockToken])
    );
  });

});