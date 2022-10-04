import { API_URL } from '../../constants/api-config'
import axios from 'axios'

// checkout community-frontend to include axios interceptors
const getAxiosInstance = (token) => {
    let axiosInit = axios.create({
        baseURL: API_URL,
        timeout: 25000,
        headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
        },
    })

    if (token) {
        axiosInit = axios.create({
            baseURL: API_URL,
            timeout: 25000,
            headers: {
                Authorization: `Token ${token}`,
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
        })
    }
    return axiosInit
}

export default getAxiosInstance
