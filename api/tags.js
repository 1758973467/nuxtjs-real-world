import { request } from '@/plugins/request'

export async function getTags() {
    return request({
        method: 'GET',
        url: '/tags',
    })
}