const BASE_URLS = {
    local: 'http://127.0.0.1:8000/',
    staging: 'https://testapi.novaweb.in/',
    prod: 'https://api.novaweb.in/',
}

export const API_URL = BASE_URLS.local
    // process.env.BACKEND === 'production' ? BASE_URLS.prod : BASE_URLS.staging
