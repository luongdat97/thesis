import axios from 'axios'
import { Http } from './http'
const cloudinary = require('cloudinary/lib/cloudinary').v2


export default class ImageCloud {

    constructor() {
        
    }

    static getSignature = async () => {
        return Http.get(`/cloud/create-signature`)
    }

    static postImage = ({ file, timestamp, signature }) => {
        const api_key = '633598575654214'
        const url = 'https://api.cloudinary.com/v1_1/project0407/image/upload'
        let payload = { file, timestamp, signature, api_key }
        return axios.post(url, payload)
    }
    static remove = (public_id) => {
        return Http.post(`/cloud/destroy`, {public_id})
    }
}