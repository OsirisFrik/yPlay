import axios from 'axios'
const api = process.env.api

const request = {
    get(url, params, v) {
        return axios.get(`${api}/v${v || 1}/${url}`, {
            params: params
        }).then(res => {
            return res.data
        }).catch(err => {
            return err.response.data
        })
    },
    post(url, body, v) {
        return axios.post(`${api}/v${v || 1}/${url}`, body).then(res => {
            return res.data
        }).catch(err => {
            return err.response.data
        })
    },
    delete(url, params, v) {
        return axios.delete(`${api}/v${v || 1}/${url}`, {
            params: params
        }).then(res => {
            return res.data
        }).catch(err => {
            return err.response.data
        })
    }
}

export default request