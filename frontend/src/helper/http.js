import Axios from 'axios';
import { BASE_URL } from '../Constances/const'

export class Http {
    get header() {
        return {
            'X-Refresh': 'refreshToken',
            'Authorization': 'authToken',
            'x-userId': 'userId',
            'Access-Control-Allow-Origin': '*',
        }
    }

    constructor() {

    }


    static get = (endPoint, params) => {
        const options = {
            header: this.header,
        }
        if (params && Object.keys(params).length) {
            options.params = params;
        }
        return Axios.get(BASE_URL + endPoint, options);
    }

    static post = (endPoint, payload) => {
        return Axios.post(BASE_URL + endPoint, payload, {
            header: this.header,
        })
    }

    static put = (endPoint, payload) => {
        return Axios.put(BASE_URL + endPoint, payload, {
            header: this.header,
        })
    }

    static patch = (endPoint, payload) => {
        return Axios.patch(BASE_URL + endPoint, payload, {
            header: this.header,
        })
    }

    static delete = (endPoint, id) => {
        return Axios.delete(BASE_URL + endPoint + '/' + id, {
            header: this.header,
        });
    }
}
