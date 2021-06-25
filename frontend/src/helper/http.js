import Axios from 'axios';
import { BASE_URL } from '../Constances/const'
import { withCookies, Cookies } from 'react-cookie';
import { getUniversalCookies } from './cookies';
 class Http {
    static get headers() {
        //console.log(getUniversalCookies().get("user"))
        let token = getUniversalCookies().get("user")?.token
        return {
            'X-Refresh': 'refreshToken',
            'Authorization': "Bearer " + token,
            'x-userId': 'userId',
            'Access-Control-Allow-Origin': '*',
        }
    }

    constructor() {

    }


    static get = (endPoint, params) => {
        console.log(this.headers)
        const options = {
            headers: this.headers,
        }
        if (params && Object.keys(params).length) {
            options.params = params;
        }
        return Axios.get(BASE_URL + endPoint, options);
    }

    static post = (endPoint, payload) => {
        return Axios.post(BASE_URL + endPoint, payload, {
            headers: this.headers,
        })
    }

    static put = (endPoint, payload) => {
        return Axios.put(BASE_URL + endPoint, payload, {
            headers: this.headers,
        })
    }

    static patch = (endPoint, payload) => {
        return Axios.patch(BASE_URL + endPoint, payload, {
            headers: this.headers,
        })
    }

    static delete = (endPoint, id) => {
        return Axios.delete(BASE_URL + endPoint + '/' + id, {
            headers: this.headers,
        });
    }
}
export default Http;