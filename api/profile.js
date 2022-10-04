import getAxiosInstance from '../components/auth/getAxiosInstance'

class ProfileApi {
    constructor(token) {
        this.axiosInstance = getAxiosInstance(token)
    }
    async getProfile(username) {
        const url = `profile/${username}`
        const resp = await this.axiosInstance.get(url)
        return resp.data
    }
    async fetchTagsList(offset, limit) {
        const url = `profile/tags/list/?limit=${limit}&offset=${offset}`
        const resp = await this.axiosInstance.get(url)
        return resp.data.results
    }

    async addProfileTags(tags_array) {
        const url = `profile/tag/update/`
        const resp = await this.axiosInstance.post(url, { tags: tags_array })
        return resp.data
    }

    async removeProfileTags(tags_array) {
        const url = `profile/tags/update/?limit=${limit}&offset=${offset}`
        const resp = await this.axiosInstance.delete(url, {
            data: { tags: tags_array },
        })
        return resp.data
    }

    async updateProfile(color, tagline, bio) {
        const url = `profile/update`
        const resp = await this.axiosInstance.patch(url, {
            color,
            bio,
            tagline,
        })
        return resp.data
    }

    async updateSocialLinks(links_array) {
        const url = 'profile/social/update/'
        const resp = await this.axiosInstance.post(url, links_array)
        return resp.data
    }

    async getSocialLinks() {
        const url = 'social_tags/list/'
        const resp = await this.axiosInstance.get(url)
        return resp.data
    }

    async getFollowerCount(username = null) {
        let url = ''
        if (username) {
            url = `community/follow/count/${username}/`
        } else {
            url = `community/follow/count`
        }

        const resp = await this.axiosInstance.get(url)
        return resp.data
    }

    async addExperience(title, subtitle, start_date, end_date, text) {
        const url = `profile/experience/create/`
        const resp = await this.axiosInstance.post(url, {
            exp_type: 'work',
            title,
            start_date,
            end_date,
            text,
            subtitle,
        })

        return resp.data
    }

    async addEducation(title, subtitle, start_date, end_date, text) {
        const url = `profile/experience/create/`
        const resp = await this.axiosInstance.post(url, {
            exp_type: 'edu',
            title,
            start_date,
            end_date,
            text,
            subtitle,
        })

        return resp.data
    }

    async addAward(title, subtitle, date, text) {
        const url = `profile/experience/create/`
        const resp = await this.axiosInstance.post(url, {
            exp_type: 'award',
            title,
            start_date: date,
            text,
            subtitle,
        })

        return resp.data
    }

    async updateExperience(id, title, subtitle, start_date, end_date, text) {
        const url = `profile/experience/${id}/update/`
        const resp = await this.axiosInstance.put(url, {
            exp_type: 'work',
            title,
            start_date,
            end_date,
            text,
            subtitle,
        })

        return resp.data
    }

    async updateEducation(id, title, subtitle, start_date, end_date, text) {
        const url = `profile/experience/${id}/update/`
        const resp = await this.axiosInstance.put(url, {
            exp_type: 'edu',
            title,
            start_date,
            end_date,
            text,
            subtitle,
        })

        return resp.data
    }

    async updateAward(id, title, subtitle, date, text) {
        const url = `profile/experience/${id}/update/`
        const resp = await this.axiosInstance.put(url, {
            exp_type: 'award',
            title,
            start_date: date,
            text,
            subtitle,
        })

        return resp.data
    }

    async deleteExperience(id) {
        const url = `profile/experience/${id}/delete/`
        const resp = await this.axiosInstance.delete(url)
        return resp
    }

}

export { ProfileApi }
