import axios from 'axios'

const request = {
    get(url, params, v) {
        return axios.get(`${process.env.api}/v${v || 1}/${url}`, {
            params: params
        }).then(res => {
            return res.data
        }).catch(err => {
            return err.response.data
        })
    },
    post(url, body, v) {
        return axios.post(`${process.env.api}/v${v || 1}/${url}`, body).then(res => {
            return res.data
        }).catch(err => {
            return err.response.data
        })
    }
}

export default request