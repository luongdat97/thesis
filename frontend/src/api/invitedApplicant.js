import Http from "../helper/http"
const API_ENDPOINT = {
    BASE: '/invited-applicant',
}

class invitedApplicantApi {
    constructor() {
        if (invitedApplicantApi._instance) {
            return invitedApplicantApi._instance
        }
        invitedApplicantApi._instance = this;

        // ... Your rest of the constructor code goes after this

    }

    // service service
    postInvitedApplicant(payload) {
        return Http.post(`${API_ENDPOINT.BASE}/create`, payload)
    }
    getInvitedApplicantList(payload) {
        return Http.get(`${API_ENDPOINT.BASE}/list`, payload)
    }
    getInvitedApplicant(payload) {
        return Http.get(`${API_ENDPOINT.BASE}/get`, payload)
    }
    delInvitedApplicant(payload) {
        return Http.post(`${API_ENDPOINT.BASE}/delete`, payload)
    }
    editInvitedApplicant(payload) {
        return Http.post(`${API_ENDPOINT.BASE}/update`, payload)
    }
}

const instance = new invitedApplicantApi();

export default instance;