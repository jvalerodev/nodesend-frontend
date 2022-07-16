import { useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import Dropzone from '@/components/Dropzone';
import Alert from '@/components/Alert';
import useAuth from '@/hooks/useAuth';
import useApp from '@/hooks/useApp';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const { fileMsg, url } = useApp();
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/links/${url}`);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <Layout>
      <div className="md:w-4/5 xl:w-3/5 mx-auto">
        {url ? (
          <div className="text-center">
            <p className="text-2xl font-bold">
              Your URL: <span className="text-red-500 ml-2">{`${process.env.NEXT_PUBLIC_FRONTEND_URL}/links/${url}`}</span>
            </p>

            {copied && <p className="mt-8 text-gray-500 font-bold">Link copied to your clipboard!</p>}

            <button
              type="button"
              className="bg-red-500 hover:bg-gray-900 p-2 rounded-md text-white cursor-pointer w-1/2 mt-8 font-bold uppercase"
              onClick={() => copyLink()}
            >Copy Link
            </button>
          </div>
        ) : (
          <>
            {fileMsg && <Alert />}

            <div className="lg:flex lg:items-center md:shadow-lg p-5 bg-white rounded-lg py-10">
              <Dropzone />

              <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 ml-5">
                <h2 className="text-4xl font-sans font-bold text-gray-800 my-4">Share files easily and privately.</h2>
                <p className="text-lg leading-loose">
                  <span className="text-red-500 font-bold">React Node Send</span> allows you to share files with end-to-end encryption. A file is deleted after it's downloaded, so you can keep what you share private and make sure your stuff doesn't stay online forever.
                </p>

                {!isAuthenticated &&
                  <div className="mt-5 text-center">
                    <Link href="/create-account">
                      <a className="text-red-500 font-bold text-lg hover:text-red-700">Create an account for more benefits.</a>
                    </Link>
                  </div>
                }
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Home;