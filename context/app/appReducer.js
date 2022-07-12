import { UPLOAD_FILE, SUCCESSFUL_FILE_UPLOAD, FAILED_FILE_UPLOAD, LINK_CREATED_SUCCESSFULLY, ERROR_CREATING_LINK, ADD_DOWNLOADS, ADD_PASSWORD, CLEAN_STATE, SHOW_ALERT, HIDE_ALERT } from '../../types';

export default (state, action) => {
  switch (action.type) {
    case SHOW_ALERT:
    case ERROR_CREATING_LINK:
      return {
        ...state,
        fileMsg: action.payload
      };

    case HIDE_ALERT:
      return {
        ...state,
        fileMsg: null
      };

    case UPLOAD_FILE:
      return {
        ...state,
        loading: true
      };

    case SUCCESSFUL_FILE_UPLOAD:
      return {
        ...state,
        filename: action.payload.filename,
        originalName: action.payload.originalName,
        loading: false
      };

    case FAILED_FILE_UPLOAD:
      return {
        ...state,
        fileMsg: action.payload,
        loading: false
      };

    case LINK_CREATED_SUCCESSFULLY:
      return {
        ...state,
        url: action.payload
      };

    case ADD_DOWNLOADS:
      return {
        ...state,
        downloads: Number(action.payload)
      };

    case ADD_PASSWORD:
      return {
        ...state,
        password: action.payload
      };

    case CLEAN_STATE:
      return {
        ...state,
        fileMsg: null,
        filename: '',
        originalName: '',
        downloads: 1,
        password: null,
        author: null,
        url: ''
      };

    default:
      return state;
  }
};