
export const state = () => {
    return {
        user: null
    }
}

export const getter = {

}

export const mutations = {
    setUser(state, payload) {
        state.user = payload
    }

}
const cookieparser = process.server ? require('cookieparser') : undefined;
export const actions = {
    nuxtServerInit(context, payload) {
        // console.info('tag', context, payload)
        let user = null;
        const { req } = payload
        if (req.headers.cookie) {
            const parsed = cookieparser.parse(req.headers.cookie)
            try {
                user = JSON.parse(parsed.user)
            } catch (err) { }
        }

        context.commit('setUser', user)

    }

}