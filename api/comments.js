import { request } from '@/plugins/request'

export async function getComments(slug) {
    return request({
        method: 'GET',
        url: `/articles/${slug}/comments`,
    })
}
export async function postComment(slug, data) {
    return request({
        method: 'POST',
        url: `/articles/${slug}/comments`,
        data
    })
}
export async function deleteComment(slug, id) {
    return request({
        method: 'DELETE',
        url: `/articles/${slug}/comments/${id}`,
    })
}
