import { Http } from "../helper/http"
const API_ENDPOINT = {
    BASE: '/notification',
}

class notificationApi {
    constructor() {
        if (notificationApi._instance) {
            return notificationApi._instance
        }
        notificationApi._instance = this;

        // ... Your rest of the constructor code goes after this

    }

    // service service
    postNotification(payload) {
        return Http.post(`${API_ENDPOINT.BASE}/create`, payload)
    }
    getNotificationList(payload) {
        return Http.get(`${API_ENDPOINT.BASE}/list`, payload)
    }
    getNotification(payload) {
        return Http.get(`${API_ENDPOINT.BASE}/get`, payload)
    }
    delNotification(id) {
        return Http.post(`${API_ENDPOINT.BASE}/delete`, { id })
    }
    editNotification(payload) {
        return Http.post(`${API_ENDPOINT.BASE}/update`, payload)
    }
}

const instance = new notificationApi();

export default instance;