import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ Component }) => {
	return localStorage.getItem('token') ? <Component /> : <Navigate to='/login' />
}

export default PrivateRoute