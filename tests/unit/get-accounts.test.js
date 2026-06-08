import { describe, it, expect, vi, beforeEach } from 'vitest';
import getAccounts from '../../src/scripts/api/get-accounts.js';

describe('getAccounts', () => {

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should return an array of accounts on successful fetch', async () => {
    const mockData = {
      "accounts": [
        {
          "email": "user@gmail.com",
          "password": "aaabbbcc4"
        }
      ]
    };

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData)
    }));

    const result = await getAccounts();

    expect(result).toEqual(mockData.accounts);
  });

  it('should return undefined and log an error if response.ok is false', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
    }));

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const result = await getAccounts();

    expect(result).toBeUndefined();
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('should return undefined and log an error if response data has no "accounts" key', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ wrongKey: [] })
    }));

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const result = await getAccounts();

    expect(result).toBeUndefined();
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('should return undefined and log an error if fetch throws', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network error')));

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const result = await getAccounts();

    expect(result).toBeUndefined();
    expect(consoleSpy).toHaveBeenCalled();
  });

});