import { request } from '@/plugins/request'

export async function login(user) {
    return await request({
        method: "POST",
        url: "/users/login",
        data: {
            user: user,
        },
    })
}
export async function register(user) {
    return await request({
        method: "POST",
        url: "/users",
        data: {
            user: user,
        },
    })
}
export async function getCurrentUser() {
    return await request({
        method: "GET",
        url: "/user",
    })
}
export async function updateUser(user) {
    return await request({
        method: "PUT",
        url: "/user",
        data: {
            user: user,
        },
    })
}