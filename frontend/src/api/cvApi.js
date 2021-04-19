import { Http } from "../helper/http"
const API_ENDPOINT = {
    BASE: '/cv',
}

class CvApi {
    constructor() {
        if (CvApi._instance) {
            return CvApi._instance
        }
        CvApi._instance = this;

        // ... Your rest of the constructor code goes after this

    }

    // service service
    postCv(payload) {
        return Http.post(`${API_ENDPOINT.BASE}/create`, payload)
    }
    getCvList() {
        return Http.get(`${API_ENDPOINT.BASE}/list`)
    }
    getCvById(id) {
        return Http.get(`${API_ENDPOINT.BASE}/get`, { id })
    }
    delCv(id) {
        return Http.post(`${API_ENDPOINT.BASE}/delete`, { id })
    }
    editCv(payload) {
        return Http.post(`${API_ENDPOINT.BASE}/update`, payload)
    }
    login(payload) {
        return Http.post(`${API_ENDPOINT.BASE}/login`, payload)
    }
}

const instance = new CvApi();

export default instance;