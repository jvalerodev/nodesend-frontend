import App from 'next/app';
import AuthProvider, { getUser } from '../context/auth/authProvider';
import AppProvider from '../context/app/appProvider';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps, user, token }) => {
  return (
    <AuthProvider user={user}>
      <AppProvider token={token}>
        <Component {...pageProps} />
      </AppProvider>
    </AuthProvider>
  );
};

MyApp.getInitialProps = async appContext => {
  const appProps = await App.getInitialProps(appContext);
  const token = appContext.ctx.req?.cookies.token;
  const user = await getUser(token);

  return {
    ...appProps,
    user,
    token
  };
};

export default MyApp;