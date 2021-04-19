import { Http } from "../helper/http"
const API_ENDPOINT = {
    BASE: '/saved-job',
}

class savedJobApi {
    constructor() {
        if (savedJobApi._instance) {
            return savedJobApi._instance
        }
        savedJobApi._instance = this;

        // ... Your rest of the constructor code goes after this

    }

    // service service
    postSavedJob(payload) {
        return Http.post(`${API_ENDPOINT.BASE}/create`, payload)
    }
    getSavedJobList(payload) {
        return Http.get(`${API_ENDPOINT.BASE}/list`, payload)
    }
    getSavedJobById(id) {
        return Http.get(`${API_ENDPOINT.BASE}/get`, { id })
    }

    getSavedJobByApplicantAndJob(payload) {
        return Http.get(`${API_ENDPOINT.BASE}/get`, payload)
    }
    delSavedJob(id) {
        return Http.post(`${API_ENDPOINT.BASE}/delete`, { id })
    }
    editSavedJob(payload) {
        return Http.post(`${API_ENDPOINT.BASE}/update`, payload)
    }
}

const instance = new savedJobApi();

export default instance;