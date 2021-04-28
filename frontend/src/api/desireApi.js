import { Http } from "../helper/http"
const API_ENDPOINT = {
    BASE: '/desire',
}

class desireApi {
    constructor() {
        if (desireApi._instance) {
            return desireApi._instance
        }
        desireApi._instance = this;

        // ... Your rest of the constructor code goes after this

    }

    // service service
    postDesire(payload) {
        return Http.post(`${API_ENDPOINT.BASE}/create`, payload)
    }
    getDesireList(payload) {
        return Http.get(`${API_ENDPOINT.BASE}/list`, payload)
    }
    getDesire(payload) {
        return Http.get(`${API_ENDPOINT.BASE}/get`, payload)
    }
    delDesire(id) {
        return Http.post(`${API_ENDPOINT.BASE}/delete`, { id })
    }
    editDesire(payload) {
        return Http.post(`${API_ENDPOINT.BASE}/update`, payload)
    }
}

const instance = new desireApi();

export default instance;