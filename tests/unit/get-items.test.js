import { describe, it, expect, vi, beforeEach } from 'vitest';
import getItems from '../../src/scripts/api/get-items.js';

describe('getItems', () => {

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should return an array of items on successful fetch', async () => {
    const mockItems = [
        {
            "id": 1,
            "name": "Leanne Graham",
            "username": "Bret",
            "email": "Sincere@april.biz",
            "address": {
            "street": "Kulas Light",
            "suite": "Apt. 556",
            "city": "Gwenborough",
            "zipcode": "92998-3874",
            "geo": {
                "lat": "-37.3159",
                "lng": "81.1496"
            }
            },
            "phone": "1-770-736-8031 x56442",
            "website": "hildegard.org",
            "company": {
            "name": "Romaguera-Crona",
            "catchPhrase": "Multi-layered client-server neural-net",
            "bs": "harness real-time e-markets"
            }
        },
        {
            "id": 2,
            "name": "Ervin Howell",
            "username": "Antonette",
            "email": "Shanna@melissa.tv",
            "address": {
            "street": "Victor Plains",
            "suite": "Suite 879",
            "city": "Wisokyburgh",
            "zipcode": "90566-7771",
            "geo": {
                "lat": "-43.9509",
                "lng": "-34.4618"
            }
            },
            "phone": "010-692-6593 x09125",
            "website": "anastasia.net",
            "company": {
            "name": "Deckow-Crist",
            "catchPhrase": "Proactive didactic contingency",
            "bs": "synergize scalable supply-chains"
            }
        },
    ];

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockItems)
    }));

    const result = await getItems();

    expect(result).toEqual(mockItems);
    expect(Array.isArray(result)).toBe(true);
  });

  it('should return null and log an error if response.ok is false', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
    }));

    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    const result = await getItems();

    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('should return null and log an error if response data is not an array', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ id: 1, name: 'John Doe' })
    }));

    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    const result = await getItems();

    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('should return null and log an error if fetch throws', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network error')));

    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    const result = await getItems();

    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalled();
  });

});