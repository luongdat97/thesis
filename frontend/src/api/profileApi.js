import { Http } from "../helper/http"
const API_ENDPOINT = {
    BASE: '/profile',
}

class profileApi {
    constructor() {
        if (profileApi._instance) {
            return profileApi._instance
        }
        profileApi._instance = this;

        // ... Your rest of the constructor code goes after this

    }

    // service service
    postProfile(payload) {
        return Http.post(`${API_ENDPOINT.BASE}/create`, payload)
    }
    getProfileList(payload) {
        return Http.get(`${API_ENDPOINT.BASE}/list`, payload)
    }
    getProfile(payload) {
        return Http.get(`${API_ENDPOINT.BASE}/get`, payload)
    }
    delProfile(id) {
        return Http.post(`${API_ENDPOINT.BASE}/delete`, { id })
    }
    editProfile(payload) {
        return Http.post(`${API_ENDPOINT.BASE}/update`, payload)
    }
}

const instance = new profileApi();

export default instance;