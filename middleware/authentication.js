
export default function (context) {
    // console.log(context)
    const { store, redirect } = context
    //未登录，跳转到登录页
    if (!store.state.user) {
        return redirect('/login')
    }
}