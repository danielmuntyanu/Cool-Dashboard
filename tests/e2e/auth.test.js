import { test, expect } from '@playwright/test';

// Helper for fast login with localStorage
async function loginAs(page, token = 'test-token') {
    await page.evaluate((t) => {
        localStorage.setItem('auth-token', t);
        localStorage.setItem('sessions', JSON.stringify([t]));
    }, token);
}

test.describe('US-1: Access to the administrative dashboard', () => {

    test('should have access to Dashboard if already logged in', async ({ page }) => {
        await page.goto('/');
        await loginAs(page);
        await page.goto('/');
        
        await page.reload();

        await expect(page).toHaveURL('/');
        await expect(page.locator('#dashboardGallery')).toBeVisible();
    });

    test('should redirect to /discover if not logged in', async ({ page }) => {
        await page.goto('/');

        await expect(page).toHaveURL(/discover/);
    });

    test('should go to /login when pressing Sign In on /discover', async ({ page }) => {
        await page.goto('/src/pages/discover.html');
        await page.click('#navSignInButton');

        await expect(page).toHaveURL(/login/);
    });

    test('should go to /login when pressing Go To Dashboard if not logged in', async ({ page }) => {
        await page.goto('/src/pages/discover.html');
        await page.click('#dashboardButton');

        await expect(page).toHaveURL(/login/);
    });

    test('should go to Dashboard when pressing Go To Dashboard if logged in', async ({ page }) => {
        await page.goto('/src/pages/discover.html');
        await loginAs(page);
        await page.click('#dashboardButton');

        await expect(page).toHaveURL('/index.html');
    });

    test('should redirect to Dashboard after correct login', async ({ page }) => {
        await page.goto('/src/pages/login.html');
        await page.fill('#formUsername', 'admin@gmail.com');
        await page.fill('#formPassword', 'abcdefg1');
        await page.click('#formSubmit');

        await expect(page).toHaveURL('/index.html');
    });

    test('should show error message on incorrect credentials', async ({ page }) => {
        await page.goto('/src/pages/login.html');
        await page.fill('#formUsername', 'wrong@example.com');
        await page.fill('#formPassword', 'wrongpass1');
        await page.click('#formSubmit');

        await expect(page.locator('#formError')).toBeVisible();
        await expect(page.locator('#formError')).toContainText('Wrong data');
    });

});

test.describe('US-2: List of employees', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await loginAs(page);
        await page.goto('/');
        // await page.reload();
    });

    test('should show employee cards when page is loaded', async ({ page }) => {
        // Ждём появления хотя бы одной карточки
        await expect(page.locator('.card').first()).toBeVisible();
    });

    test('should show error message if fetch fails', async ({ page }) => {
        // Перехватываем запрос и возвращаем ошибку
        await page.route('https://jsonplaceholder.typicode.com/users', route => {
            route.abort();
        });

        await page.reload();

        await expect(page.locator('#dashboardError')).toBeVisible();
        await expect(page.locator('#dashboardError')).toContainText('Something went wrong');
    });

});

test.describe('US-3: Filtering employees by first letter', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await loginAs(page);
        await page.goto('/');
        await expect(page.locator('.card').first()).toBeVisible();
    });

    test('should show only employees starting with selected letter', async ({ page }) => {
        await page.click('#filter_M');

        const cards = page.locator('.card h3');
        const count = await cards.count();

        for (let i = 0; i < count; i++) {
            const name = await cards.nth(i).innerText();
            expect(name.trim().at(0).toUpperCase()).toBe('M');
        }
    });

    test('should show empty state if no employees match the letter', async ({ page }) => {
        await page.click('#filter_Z');

        await expect(page.locator('#dashboardEmpty')).toBeVisible();
    });

    test('should restore full list when filter is cleared', async ({ page }) => {
        await page.click('#filter_M');
        await page.click('#filter_ALL');

        await expect(page.locator('.card').first()).toBeVisible();
        const count = await page.locator('.card').count();
        expect(count).toBeGreaterThan(1);
    });

});

test.describe('US-4: Log out', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await loginAs(page);
        await page.goto('/');
    });

    test('should redirect to login and clear session after logout', async ({ page }) => {
        await page.click('#logOutButton');

        await expect(page).toHaveURL(/login/);

        const token = await page.evaluate(() => localStorage.getItem('auth-token'));
        expect(token).toBeNull();
    });

    test('should keep session if user never logs out', async ({ page }) => {
        // Просто проверяем что токен всё ещё есть без логаута
        const token = await page.evaluate(() => localStorage.getItem('auth-token'));
        expect(token).not.toBeNull();
    });

});