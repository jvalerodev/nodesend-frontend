import { useState } from 'react';
import Layout from '@/components/Layout';
import Alert from '@/components/Alert';
import axiosClient from '@/config/axios';
import useApp from '@/hooks/useApp';

export const getServerSideProps = async ({ params }) => {
  const { link } = params;
  let resp;

  try {
    resp = await axiosClient(`/api/links/${link}`);
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      }
    };
  }

  return {
    props: {
      link: resp.data
    }
  };
};

export const getServerSidePaths = async () => {
  const res = await axiosClient('/api/links');

  return {
    paths: res.data.links.map(link => ({
      params: { link: link.url }
    })),
    fallback: false
  };
};

const Link = ({ link }) => {
  const [hasPassword, setHasPassword] = useState(link.hasPassword);
  const [password, setPassword] = useState('');

  const { showAlert, fileMsg } = useApp();

  const handleSubmit = async e => {
    e.preventDefault();

    if (!password) return;

    try {
      const res = await axiosClient.post(`/api/links/${link.url}`, { password });
      setHasPassword(res.data.hasPassword);
    } catch (error) {
      showAlert(error.response.data.msg);
    }
  };

  return (
    <Layout>
      {hasPassword ? (
        <div className="flex flex-col items-center">
          {fileMsg && <Alert />}

          <p className="text-gray-700">This link is protected by a password. Type it below.</p>

          <div className="w-full max-w-lg mx-auto mt-10">
            <form className="bg-white rounded shadow-md px-8 py-7 mb-4" onSubmit={handleSubmit}>
              <div className="mb-5">
                <label htmlFor="password" className="block text-black text-sm font-bold mb-2">Password</label>
                <input
                  type="password"
                  id="password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-red-500"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <input
                type="submit"
                className="bg-red-500 hover:bg-gray-900 p-2 rounded-md text-white cursor-pointer w-full mt-3 font-bold uppercase"
                value="Get file"
              />
            </form>
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-4xl text-center text-gray-700 font-bold">Download your file:</h1>
          <div className="flex items-center justify-center mt-10">
            <a href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/files/${link.file}`} className="bg-red-500 hover:bg-red-600 py-3 px-10 rounded text-white font-bold uppercase">Here</a>
          </div>
        </>
      )}

    </Layout>
  );
};

export default Link;