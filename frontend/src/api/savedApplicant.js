import { Http } from "../helper/http"
const API_ENDPOINT = {
    BASE: '/saved-applicant',
}

class savedApplicantApi {
    constructor() {
        if (savedApplicantApi._instance) {
            return savedApplicantApi._instance
        }
        savedApplicantApi._instance = this;

        // ... Your rest of the constructor code goes after this

    }

    // service service
    postSavedApplicant(payload) {
        return Http.post(`${API_ENDPOINT.BASE}/create`, payload)
    }
    getSavedApplicantList(payload) {
        return Http.get(`${API_ENDPOINT.BASE}/list`, payload)
    }
    getSavedApplicant(payload) {
        return Http.get(`${API_ENDPOINT.BASE}/get`, payload)
    }
    delSavedApplicant(id) {
        return Http.post(`${API_ENDPOINT.BASE}/delete`, { id })
    }
    editSavedApplicant(payload) {
        return Http.post(`${API_ENDPOINT.BASE}/update`, payload)
    }
}

const instance = new savedApplicantApi();

export default instance;