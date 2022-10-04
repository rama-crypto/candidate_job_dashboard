import { API_URL } from '../../constants/api-config'
import getAxiosInstance from './getAxiosInstance'

const getUserToken = async ({
    email,
    password,
    doneCallback,
    errorCallback,
}) => {
    const axiosInstance = getAxiosInstance()
    try {
        const { data } = await axiosInstance.post(API_URL + 'login/', {
            key: email,
            password: password,
        })
        doneCallback(data)
    } catch (err) {
        errorCallback(err)
    }
}

export default getUserToken
