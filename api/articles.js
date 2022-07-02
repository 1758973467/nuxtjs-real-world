import { request } from '@/plugins/request'

export async function getArticles(params) {
    return request({
        method: 'GET',
        url: '/articles',
        params
    })
}


export async function getFeedArticles(params) {
    return request({
        method: 'GET',
        url: '/articles/feed',
        params,

    })
}
export async function deleteArticle(slug) {
    return request({
        method: 'DELETE',
        url: `/articles/${slug}`,

    })
}

export async function addFavoriteArticle(slug) {
    return request({
        method: 'POST',
        url: `/articles/${slug}/favorite`,
    })
}
export async function deleteFavoriteArticle(slug) {
    return request({
        method: 'DELETE',
        url: `/articles/${slug}/favorite`,

    })
}

export async function getArticle(slug) {
    return request({
        method: 'GET',
        url: `articles/${slug}`
    })
}

export async function createArticle(data) {
    return request({
        method: 'POST',
        url: `articles`,
        data
    })
}