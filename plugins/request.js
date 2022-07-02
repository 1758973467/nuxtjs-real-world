import axios from "axios";

export const request = axios.create({
    baseURL: 'http://realworld.api.fed.lagounews.com/api'
})

export default ({ store }) => {

    request.interceptors.request.use(function (config) {

        const { user } = store.state
        // console.log("🚀 ~ file: request.js ~ line 12 ~ store", store)
        if (user && user.token) {
            config.headers.Authorization = `Token ${user.token}`
        }
        return config;
    }, function (error) {
        return Promise.reject(error)
    })
}