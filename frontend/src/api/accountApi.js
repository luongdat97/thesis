import  Http  from "../helper/http"
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
    getAccountByUsername(username) {
        return Http.get(`${API_ENDPOINT.BASE}/get`, { username })
    }
    delAccount(id) {
        return Http.post(`${API_ENDPOINT.BASE}/delete`, { id })
    }
    editAccount(payload) {
        return Http.post(`${API_ENDPOINT.BASE}/update`, payload)
    }s
    changePass(payload) {
        return Http.post(`${API_ENDPOINT.BASE}/change-pass`, payload)
    }
    changeActive(payload) {
        return Http.post(`${API_ENDPOINT.BASE}/change-active`, payload)
    }
}

const instance = new AccountApi();

export default instance;