import getAxiosInstance from './getAxiosInstance'

const getUserProfile = async (token, doneCallback, errorCallback) => {
    try {
        console.log('user profile fetch request called')
        const axiosInstance = getAxiosInstance(token)
        const { data } = await axiosInstance.get('profile/')
        if (data) {
            doneCallback(data)
        }
    } catch (err) {
        console.log(err)
        errorCallback(err)
    }
}

export default getUserProfile
