import { Http } from "../helper/http"
const API_ENDPOINT = {
    BASE: '/job',
}

class jobApi {
    constructor() {
        if (jobApi._instance) {
            return jobApi._instance
        }
        jobApi._instance = this;

        // ... Your rest of the constructor code goes after this

    }

    // service service
    postJob(payload) {
        return Http.post(`${API_ENDPOINT.BASE}/create`, payload)
    }
    getJobList(payload) {
        return Http.get(`${API_ENDPOINT.BASE}/list`, payload)
    }
    getJobById(id) {
        return Http.get(`${API_ENDPOINT.BASE}/get`, { id })
    }
    delJob(id) {
        return Http.post(`${API_ENDPOINT.BASE}/delete`, { id })
    }
    editJob(payload) {
        return Http.post(`${API_ENDPOINT.BASE}/update`, payload)
    }
}

const instance = new jobApi();

export default instance;