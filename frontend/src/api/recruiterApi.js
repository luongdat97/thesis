import { Http } from "../helper/http"
const API_ENDPOINT = {
    BASE: '/recruiter',
}

class RecruiterApi {
    constructor() {
        if (RecruiterApi._instance) {
            return RecruiterApi._instance
        }
        RecruiterApi._instance = this;

        // ... Your rest of the constructor code goes after this

    }

    // service service
    postRecruiter(payload) {
        return Http.post(`${API_ENDPOINT.BASE}/create`, payload)
    }
    getRecruiterList() {
        return Http.get(`${API_ENDPOINT.BASE}/list`)
    }
    getRecruiterById(id) {
        return Http.get(`${API_ENDPOINT.BASE}/get`, { id })
    }
    delRecruiter(id) {
        return Http.post(`${API_ENDPOINT.BASE}/delete`, { id })
    }
    editRecruiter(payload) {
        return Http.post(`${API_ENDPOINT.BASE}/update`, payload)
    }
    register(payload) {
        return Http.post(`${API_ENDPOINT.BASE}/register`, payload)
    }
    login(payload) {
        return Http.post(`${API_ENDPOINT.BASE}/login`, payload)
    }
}

const instance = new RecruiterApi();

export default instance;