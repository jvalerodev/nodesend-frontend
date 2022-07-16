import { useReducer } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import AuthContext from '@/context/auth/authContext';
import authReducer from '@/context/auth/authReducer';
import axiosClient from '@/config/axios';
import { LOADING, SUCCESSFUL_SIGN_UP, SIGN_UP_ERROR, SUCCESSFUL_LOGIN, LOGIN_ERROR, SIGN_OUT, HIDE_ALERT } from '@/types/index';

// Usuario autenticado en base al JWT
const getUser = async token => {
  if (!token) return null;

  axiosClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  let user = null;

  try {
    const res = await axiosClient(`/api/auth`);
    user = res.data.user;
  } catch (error) {
    console.log(error.response.data.msg);
  }

  return user;
};

const AuthProvider = ({ children, user }) => {
  // State inicial
  const initialState = {
    isAuthenticated: user ? true : false,
    user: user,
    message: null,
    loading: false
  };

  const router = useRouter();

  // Reducer
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Registrar nuevo usuario
  const signUp = async data => {
    dispatch({
      type: LOADING
    });
    
    let success = false;

    try {
      const res = await axiosClient.post('/api/users', data);
      dispatch({
        type: SUCCESSFUL_SIGN_UP,
        payload: res.data.msg
      });
      success = true;
    } catch (error) {
      dispatch({
        type: SIGN_UP_ERROR,
        payload: error.response.data.msg
      });
    }
    setTimeout(() => {
      dispatch({
        type: HIDE_ALERT
      });
    }, 3000);

    return success;
  };

  // Iniciar sesion
  const logIn = async data => {
    dispatch({
      type: LOADING
    });
    
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/auth/login`, data, {
        withCredentials: true,
        credentials: 'include'
      });
      dispatch({
        type: SUCCESSFUL_LOGIN,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
        payload: error.response.data.msg
      });
    }

    setTimeout(() => {
      dispatch({
        type: HIDE_ALERT
      });
    }, 3000);
  };

  // Cerrar sesion
  const logOut = async () => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/auth/logout`, {}, {
        withCredentials: true,
        credentials: 'include'
      });
      dispatch({
        type: SIGN_OUT
      });
      
      router.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        message: state.message,
        loading: state.loading,
        signUp,
        logIn,
        logOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { getUser };
export default AuthProvider;