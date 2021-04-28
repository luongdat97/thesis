import { Http } from "../helper/http"
const API_ENDPOINT = {
    BASE: '/company',
}

class CompanyApi {
    constructor() {
        if (CompanyApi._instance) {
            return CompanyApi._instance
        }
        CompanyApi._instance = this;

        // ... Your rest of the constructor code goes after this

    }

    // service service
    postCompany(payload) {
        return Http.post(`${API_ENDPOINT.BASE}/create`, payload)
    }
    getCompanyList() {
        return Http.get(`${API_ENDPOINT.BASE}/list`)
    }
    getCompanyById(id) {
        return Http.get(`${API_ENDPOINT.BASE}/get`, { id })
    }
    delCompany(id) {
        return Http.post(`${API_ENDPOINT.BASE}/delete`, { id })
    }
    editCompany(payload) {
        return Http.post(`${API_ENDPOINT.BASE}/update`, payload)
    }
}

const instance = new CompanyApi();

export default instance;