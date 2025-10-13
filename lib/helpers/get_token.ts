
import { BrowserContext, Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

export async function extractAuthToken(
    page: Page,
    context: BrowserContext,
    storageFile: string = path.resolve(process.cwd(), 'authToken.json')
): Promise<AuthExtractionResult> {

    // 1️⃣ Get cookies
    const cookies = await context.cookies();

    // 2️⃣ Try to find common cookie token names
    const cookieNamesToTry = ['auth-token', 'access_token', 'token', 'session', 'sessionid', 'jwt'];
    let tokenFromCookie: string | null = null;

    for (const name of cookieNamesToTry) {
        const c = cookies.find(k => k.name === name);
        if (c && c.value) {
            tokenFromCookie = c.value;
            console.log(`Found token in cookie "${name}"`);
            break;
        }
    }

    // 3️⃣ Get localStorage (from current page origin)
    const localStorageData: Record<string, string> = await page.evaluate(() => {
        const data: Record<string, string> = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key) data[key] = localStorage.getItem(key) || '';
        }
        return data;
    });

    // 4️⃣ Try to find token in localStorage keys
    const localStorageNamesToTry = ['token', 'auth-token', 'access_token', 'jwt'];
    let tokenFromLocalStorage: string | null = null;

    for (const name of localStorageNamesToTry) {
        if (localStorageData[name]) {
            tokenFromLocalStorage = localStorageData[name];
            console.log(`Found token in localStorage "${name}"`);
            break;
        }
    }

    // 5️⃣ Print findings (short)
    console.log('\n--- Cookies (short) ---');
    cookies.forEach(c =>
        console.log(`${c.name}=${String(c.value).slice(0, 80)}${String(c.value).length > 80 ? '...' : ''}`)
    );

    console.log('\n--- LocalStorage (short) ---');
    Object.keys(localStorageData).forEach(k =>
        console.log(`${k}=${String(localStorageData[k]).slice(0, 80)}${String(localStorageData[k]).length > 80 ? '...' : ''}`)
    );

    // 6️⃣ Determine final token
    const token = tokenFromCookie || tokenFromLocalStorage;
    if (token) {
        console.log('✅ Auth token found.');
    } else {
        console.log('⚠️ No auth token found in common cookie/localStorage keys.');
    }

    // 7️⃣ Save storage state to file (cookies + localStorage)
    await context.storageState({ path: storageFile });
    //console.log(`💾 Storage state saved to ${storageFile}`);

    return {
        token,
        tokenFromCookie,
        tokenFromLocalStorage,
        cookies,
        localStorageData,
        storageFile
    };
}