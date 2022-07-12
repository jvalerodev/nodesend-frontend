import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Layout from '../components/Layout';
import ErrorForm from '../components/ErrorForm';
import Alert from '../components/Alert';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const { logIn, message, isAuthenticated } = useAuth();

  if (isAuthenticated && typeof window !== 'undefined') {
    location.href = '/';
  }

  // Validacion del formulario
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('Email address is required.')
        .email('Invalid email address.'),
      password: Yup.string()
        .required('Password is required.')
    }),
    onSubmit: values => {
      logIn(values);
    }
  });

  return (
    <Layout>
      <div className="md:w-4/5 xl:w-3/5 mx-auto">
        <h2 className="text-4xl font-sans font-bold text-gray-800 text-center my-12">Log in</h2>

        {message && <Alert />}

        <div className="flex justify-center">
          <div className="w-full max-w-lg">
            <form className="bg-white rounded shadow-md px-8 py-7 mb-4" onSubmit={formik.handleSubmit}>
              <div className="mb-5">
                {formik.touched.email && formik.errors.email ? <ErrorForm value={formik.errors.email} /> : null}
                <label htmlFor="email" className="block text-black text-sm font-bold mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-red-500"
                  placeholder="Email address"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              <div className="mb-5">
                {formik.touched.password && formik.errors.password ? <ErrorForm value={formik.errors.password} /> : null}
                <label htmlFor="password" className="block text-black text-sm font-bold mb-2">Password</label>
                <input
                  type="password"
                  id="password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-red-500"
                  placeholder="Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              <input
                type="submit"
                className="bg-red-500 hover:bg-gray-900 p-2 rounded-md text-white cursor-pointer w-full mt-3 font-bold uppercase"
                value="Log in"
              />
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;