import { request } from '@/plugins/request'

export async function getProfile(username) {
    return request({
        method: 'GET',
        url: `/profiles/${username}`,
    })
}

export async function followAuthor(username) {
    return request({
        method: 'POST',
        url: `/profiles/${username}/follow`,
    })
}
export async function unfollowAuthor(username) {
    return request({
        method: 'DELETE',
        url: `/profiles/${username}/follow`,
    })
}