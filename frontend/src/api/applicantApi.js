import { Http } from "../helper/http"
const API_ENDPOINT = {
    BASE: '/applicant',
}

class ApplicantApi {
    constructor() {
        if (ApplicantApi._instance) {
            return ApplicantApi._instance
        }
        ApplicantApi._instance = this;

        // ... Your rest of the constructor code goes after this

    }

    // service service
    postApplicant(payload) {
        return Http.post(`${API_ENDPOINT.BASE}/create`, payload)
    }
    getApplicantList() {
        return Http.get(`${API_ENDPOINT.BASE}/list`)
    }
    getApplicantById(id) {
        return Http.get(`${API_ENDPOINT.BASE}/get`, { id })
    }
    delApplicant(id) {
        return Http.post(`${API_ENDPOINT.BASE}/delete`, { id })
    }
    editApplicant(payload) {
        return Http.post(`${API_ENDPOINT.BASE}/update`, payload)
    }
    register(payload) {
        return Http.post(`${API_ENDPOINT.BASE}/register`, payload)
    }
}

const instance = new ApplicantApi();

export default instance;