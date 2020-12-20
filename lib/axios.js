import axios from 'axios'

const getConfig = () => {
    const data = {
        url: ''
    }

    if (typeof window !== 'undefined') {
        data.url = window.location.origin
    }

    return {
        baseURL: data.url,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }
}
export const GET = async (url) => {
    const request_config = getConfig()

    request_config.url = url
    request_config.method = 'get'

    return axios({ ...request_config }).then((response) => {
        return response.data
    }).catch((err) => {
        return err
    })
}
export const POST = async (url, params) => {
    const request_config = getConfig()

    request_config.url = url
    request_config.method = 'post'
    request_config.data = params

    return axios({ ...request_config }).then((response) => {
        return response.data
    }).catch((err) => {
        return err
    })
}
