import getAxiosInstance from '../components/auth/getAxiosInstance'

class InternshipsApi {
    constructor(token) {
        this.axiosInstance = getAxiosInstance(token)
    }

    async fetchInternshipsList(offset, limit) {
        const url = `internships/opportunity/?limit=${limit}&offset=${offset}`
        const resp = await this.axiosInstance.get(url)
        return resp.data.results
    }

    async fetchInternshipDetail(id) {
        const url = `internships/opportunity/${id}/`
        const resp = await this.axiosInstance.get(url)
        return resp.data
    }

    async deleteInternship(id) {
        const url = `internships/opportunity/delete/${id}/`
        const resp = await this.axiosInstance.delete(url)
        return resp.data
    }

    async createInternship(data) {
        const url = `internships/opportunity/create/`
        const resp = await this.axiosInstance.post(url, data)
        return resp.data
    }

    async fetchApplyLink(id) {
        const url = `internships/opportunity/${id}/apply/`
        const resp = await this.axiosInstance.get(url)
        return resp.data
    }
}

export { InternshipsApi }
