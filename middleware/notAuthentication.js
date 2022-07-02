
export default function ({ store, redirect }) {
    // console.log(context.store)
    // console.log(context.redirect)
    // 如果用户登录，则跳转到首页
    if (store.state.user) {
        return redirect('/')
    }
}