import useAuth from '@/hooks/useAuth';
import useApp from '@/hooks/useApp';

const Alert = () => {
  const { message } = useAuth();
  const { fileMsg } = useApp();

  return (
    <div className="bg-red-500 py-2 px-3 w-full my-3 max-w-lg text-center text-white mx-auto rounded-md mb-5">
      <p>{message || fileMsg}</p>
    </div>
  );
};

export default Alert;