import { useContext } from 'react';
import AppContext from '@/context/app/appContext';

const useApp = () => {
  return useContext(AppContext);
};

export default useApp;