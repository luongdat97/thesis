import { Http } from "../helper/http"
const API_ENDPOINT = {
    BASE: '/employee',
}

class EmployeeApi {
    constructor() {
        if (EmployeeApi._instance) {
            return EmployeeApi._instance
        }
        EmployeeApi._instance = this;

        // ... Your rest of the constructor code goes after this

    }

    // service service
    postEmployee(payload) {
        return Http.post(`${API_ENDPOINT.BASE}/create`, payload)
    }
    getEmployeeList() {
        return Http.get(`${API_ENDPOINT.BASE}/list`)
    }
    getEmployeeById(id) {
        return Http.get(`${API_ENDPOINT.BASE}/get`, { id })
    }
    delEmployee(id) {
        return Http.post(`${API_ENDPOINT.BASE}/delete`, { id })
    }
    editEmployee(payload) {
        return Http.post(`${API_ENDPOINT.BASE}/update`, payload)
    }
    register(payload) {
        return Http.post(`${API_ENDPOINT.BASE}/register`, payload)
    }
    login(payload) {
        return Http.post(`${API_ENDPOINT.BASE}/login`, payload)
    }
}

const instance = new EmployeeApi();

export default instance;