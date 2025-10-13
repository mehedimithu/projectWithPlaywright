interface AuthExtractionResult {
    token: string | null;
    tokenFromCookie: string | null;
    tokenFromLocalStorage: string | null;
    cookies: { name: string; value: string }[];
    localStorageData: Record<string, string>;
    storageFile: string;
}