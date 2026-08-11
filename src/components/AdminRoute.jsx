import {Navigate} from 'react-router'
import {useAuth} from '../context/AuthContext'


function AdminRoute(children) {
    const {user,loading,isAdmin} = useAuth()
    if(loading){
        return <p className='page-loading'>Loading...</p>
    }
    if(!user){
        return <Navigate to ='/sign-in' />
    }
    if(!isAdmin){
        return <Navigate to ='/dashboard' />
    }
  return children
}

export default AdminRoute
 