import { useSelector } from "react-redux"
import { Outlet, Navigate} from "react-router-dom"

const OnlyadminPrivateRoute = () => {
    const { currentUser } = useSelector((state) => state.user)
  return currentUser &&
  currentUser.idAdmin ? <Outlet /> : <Navigate to='/sign-in' />
}

export default OnlyadminPrivateRoute;
