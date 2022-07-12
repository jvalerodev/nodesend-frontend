import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useAuth from '../hooks/useAuth';
import useApp from '../hooks/useApp';

const Header = () => {
  const { user, logOut } = useAuth();
  const { cleanState } = useApp();

  const router = useRouter();

  const redirect = () => {
    cleanState();
    router.push('/');
  };

  return (
    <header>
      <div className="flex flex-col md:flex-row items-center justify-between py-8">
        <img
          src="/logo.svg"
          className="w-64 mb-8 md:mb-0 cursor-pointer"
          onClick={() => redirect()}
        />

        {user ? (
          <div className="flex items-center space-x-5">
            <p>Hi, {user.name}!</p>
            <button type="button" className="bg-gray-900 hover:bg-black px-5 py-3 rounded-full text-white font-bold uppercase" onClick={() => logOut()}>Sign out</button>
          </div>
        ) : (
          <div className="space-x-3">
            <Link href="/login">
              <a className="bg-red-500 hover:bg-red-600 px-5 py-3 rounded-full text-white font-bold uppercase">Log in</a>
            </Link>
            <Link href="/create-account">
              <a className="bg-gray-900 hover:bg-black px-5 py-3 rounded-full text-white font-bold uppercase">Create account</a>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;