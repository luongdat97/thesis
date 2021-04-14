import { Http } from "../helper/http"
const API_ENDPOINT = {
    BASE: '/account',
}

class AccountApi {
    constructor() {
        if (AccountApi._instance) {
            return AccountApi._instance
        }
        AccountApi._instance = this;

        // ... Your rest of the constructor code goes after this

    }

    // service service
    postAccount(payload) {
        return Http.post(`${API_ENDPOINT.BASE}/create`, payload)
    }
    getAccountList() {
        return Http.get(`${API_ENDPOINT.BASE}/list`)
    }
    getAccountById(id) {
        return Http.get(`${API_ENDPOINT.BASE}/get`, { id })
    }
    delAccount(id) {
        return Http.post(`${API_ENDPOINT.BASE}/delete`, { id })
    }
    editAccount(payload) {
        return Http.post(`${API_ENDPOINT.BASE}/update`, payload)
    }
    login(payload) {
        return Http.post(`${API_ENDPOINT.BASE}/login`, payload)
    }
}

const instance = new AccountApi();

export default instance;