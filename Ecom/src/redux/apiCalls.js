import { publicRequest } from "../requestMethod"
import { logOut, loginFailure, loginStart, loginSuccess } from "./userRedux"

export const login = async (dispatch, user) => {
    dispatch(loginStart())
    try {
        const res = await publicRequest.post('auth/login', user)
        
        dispatch(loginSuccess(res.data))
        window.location.reload()
    }
    catch (err) {
        dispatch(loginFailure(err.response.data))
    }
}

export const logout = async (dispatch) => {
    try{
        await publicRequest.delete('auth/logout')
        dispatch(logOut())
    }
    catch(err){
        console.log(err)
    }
}