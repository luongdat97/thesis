import { Http } from "../helper/http"
const API_ENDPOINT = {
    BASE: '/admin',
}

class AdminApi {
    constructor() {
        if (AdminApi._instance) {
            return AdminApi._instance
        }
        AdminApi._instance = this;

        // ... Your rest of the constructor code goes after this

    }

    // service service
    postAdmin(payload) {
        return Http.post(`${API_ENDPOINT.BASE}/create`, payload)
    }
    getAdminList() {
        return Http.get(`${API_ENDPOINT.BASE}/list`)
    }
    getAdminById(id) {
        return Http.get(`${API_ENDPOINT.BASE}/get`, { id })
    }
    delAdmin(id) {
        return Http.post(`${API_ENDPOINT.BASE}/delete`, { id })
    }
    editAdmin(payload) {
        return Http.post(`${API_ENDPOINT.BASE}/update`, payload)
    }
    register(payload) {
        return Http.post(`${API_ENDPOINT.BASE}/register`, payload)
    }
    login(payload) {
        return Http.post(`${API_ENDPOINT.BASE}/login`, payload)
    }
}

const instance = new AdminApi();

export default instance;