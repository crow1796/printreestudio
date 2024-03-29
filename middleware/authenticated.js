export default function ({ store, route, redirect, $auth }) {
  const user = store.getters['user']
  const isLoggedIn = store.getters['isLoggedIn']
  if(!user?._id){
    $auth.logout()
    return redirect('/')
  }
  if (!isLoggedIn) return redirect('/')
  const isAdmin = _.includes(_.map(user.roles, 'name'), 'admin')
  const isCustomer = _.includes(_.map(user.roles, 'name'), 'customer')
  
  if (isLoggedIn && isCustomer && (route.path.includes('/dashboard') || route.path.includes('/admin'))) return redirect('/marketplace/')

  if (isLoggedIn && isAdmin && route.path.includes('/dashboard')) return redirect('/admin/collections')
}
