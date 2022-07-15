import { useReducer } from 'react';
import AppContext from './appContext';
import appReducer from './appReducer';
import axiosClient from '../../config/axios';
import { UPLOAD_FILE, SUCCESSFUL_FILE_UPLOAD, FAILED_FILE_UPLOAD, LINK_CREATED_SUCCESSFULLY, ERROR_CREATING_LINK, ADD_DOWNLOADS, ADD_PASSWORD, CLEAN_STATE, SHOW_ALERT, HIDE_ALERT } from '../../types';

const AppProvider = ({ children, token }) => {
  const initialState = {
    fileMsg: null,
    filename: '',
    originalName: '',
    downloads: 1,
    password: null,
    author: null,
    url: '',
    loading: false
  };

  const [state, dispatch] = useReducer(appReducer, initialState);

  const showAlert = msg => {
    dispatch({
      type: SHOW_ALERT,
      payload: msg
    });

    setTimeout(() => {
      dispatch({
        type: HIDE_ALERT
      });
    }, 4000);
  };

  const uploadFile = async (file, filename) => {
    dispatch({
      type: UPLOAD_FILE
    });

    if (token) axiosClient.defaults.headers.common.Authorization = `Bearer ${token}`;

    try {
      const res = await axiosClient.post('/api/files/upload', file);

      dispatch({
        type: SUCCESSFUL_FILE_UPLOAD,
        payload: { filename: res.data.file, originalName: filename }
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: FAILED_FILE_UPLOAD,
        payload: error.response.data.msg
      });
    }
  };

  const createLink = async () => {
    const data = {
      filename: state.filename,
      originalName: state.originalName,
      downloads: state.downloads,
      password: state.password,
      author: state.author
    };

    if (token) axiosClient.defaults.headers.common.Authorization = `Bearer ${token}`;

    try {
      const res = await axiosClient.post('/api/links/create', data);
      
      dispatch({
        type: LINK_CREATED_SUCCESSFULLY,
        payload: res.data.msg
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ERROR_CREATING_LINK,
        payload: error.response.data.msg
      });
    }
  };

  const addDownloads = downloads => {
    dispatch({
      type: ADD_DOWNLOADS,
      payload: downloads
    });
  };

  const addPassword = password => {
    dispatch({
      type: ADD_PASSWORD,
      payload: password
    });
  };

  const cleanState = () => {
    dispatch({
      type: CLEAN_STATE
    });
  };

  return (
    <AppContext.Provider
      value={{
        fileMsg: state.fileMsg,
        filename: state.filename,
        originalName: state.originalName,
        downloads: state.downloads,
        password: state.password,
        author: state.author,
        url: state.url,
        loading: state.loading,
        showAlert,
        uploadFile,
        createLink,
        addDownloads,
        addPassword,
        cleanState
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;