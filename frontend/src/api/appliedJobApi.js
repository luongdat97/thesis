import Http from "../helper/http"
const API_ENDPOINT = {
    BASE: '/applied-job',
}

class appliedJobApi {
    constructor() {
        if (appliedJobApi._instance) {
            return appliedJobApi._instance
        }
        appliedJobApi._instance = this;

        // ... Your rest of the constructor code goes after this

    }

    // service service
    postAppliedJob(payload) {
        return Http.post(`${API_ENDPOINT.BASE}/create`, payload)
    }
    getAppliedJobList(payload) {
        return Http.get(`${API_ENDPOINT.BASE}/list`, payload)
    }
    getAppliedJobById(id) {
        return Http.get(`${API_ENDPOINT.BASE}/get`, { id })
    }

    getAppliedJobByApplicantAndJob(payload) {
        return Http.get(`${API_ENDPOINT.BASE}/get`, payload)
    }
    delAppliedJob(id) {
        return Http.post(`${API_ENDPOINT.BASE}/delete`, { id })
    }
    editAppliedJob(payload) {
        return Http.post(`${API_ENDPOINT.BASE}/update`, payload)
    }
}

const instance = new appliedJobApi();

export default instance;