import { request } from '@/plugins/request'

export async function favoriteArticle(slug) {
    return request({
        method: 'POST',
        url: `/articles/${slug}/favorite`,
    })
}

export async function unfavoriteArticle(slug) {
    return request({
        method: 'DELETE',
        url: `/articles/${slug}/favorite`,
    })
}