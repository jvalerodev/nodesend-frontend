import Head from 'next/head';
import Header from './Header';

const Layout = ({ children, user }) => {
  return (
    <>
      <Head>
        <title>React Node Send</title>
      </Head>

      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto">
          <Header user={user} />

          <main className="mt-20">
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;