// @vitest-environment jsdom

import { describe, it, expect, vi, beforeEach } from 'vitest';
import removeSession from '../../src/scripts/api/remove-session.js';

describe('removeSession', () => {

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should remove the matching token from sessions', () => {
    const sessions = ['token-aaa', 'token-bbb', 'token-ccc'];

    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify(sessions));
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

    removeSession('token-bbb');

    expect(setItemSpy).toHaveBeenCalledWith(
      'sessions',
      JSON.stringify(['token-aaa', 'token-ccc'])
    );
  });

  it('should not alter sessions if token is not found', () => {
    const sessions = ['token-aaa', 'token-bbb'];

    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify(sessions));
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

    removeSession('token-xyz');

    expect(setItemSpy).toHaveBeenCalledWith(
      'sessions',
      JSON.stringify(sessions)
    );
  });

  it('should save an empty array if sessions has only one token and it is removed', () => {
    const sessions = ['token-aaa'];

    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify(sessions));
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

    removeSession('token-aaa');

    expect(setItemSpy).toHaveBeenCalledWith('sessions', JSON.stringify([]));
  });

  it('should save an empty array if localStorage is empty', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

    removeSession('token-aaa');

    expect(setItemSpy).toHaveBeenCalledWith('sessions', JSON.stringify([]));
  });

});