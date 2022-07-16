import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Layout from '@/components/Layout';
import ErrorForm from '@/components/ErrorForm';
import Alert from '@/components/Alert';
import Loading from '@/components/Loading';
import useAuth from '@/hooks/useAuth';

const CreateAccount = () => {
  // Acceder al state
  const { isAuthenticated, signUp, message, loading } = useAuth();
  const router = useRouter();

  if (isAuthenticated && typeof window !== 'undefined') {
    router.push('/');
  }

  // Validacion del formulario
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('Name is required.'),
      email: Yup.string()
        .required('Email address is required.')
        .email('Invalid email address.'),
      password: Yup.string()
        .required('Password is required.')
        .min(6, 'The password must have at least 6 characters.'),
      confirmPassword: Yup.string()
        .required('Confirm password is required.')
        .equals([Yup.ref('password')], 'Passwords do not match.')
    }),
    onSubmit: async (values, actions) => {
      if (await signUp(values)) {
        actions.resetForm();
      }
    }
  });

  return (
    <Layout>
      {loading && <Loading loading={loading} />}
      
      <div className="md:w-4/5 xl:w-3/5 mx-auto">
        <h2 className="text-4xl font-sans font-bold text-gray-800 text-center my-12">Create Account</h2>

        {message && <Alert />}

        <div className="flex justify-center mt-5">
          <div className="w-full max-w-lg">
            <form className="bg-white rounded shadow-md px-8 py-7 mb-4" onSubmit={formik.handleSubmit}>
              <div className="mb-5">
                {formik.touched.name && formik.errors.name ? <ErrorForm value={formik.errors.name} /> : null}
                <label htmlFor="name" className="block text-black text-sm font-bold mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-red-500"
                  placeholder="First and last name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              <div className="mb-5">
                {formik.touched.email && formik.errors.email ? <ErrorForm value={formik.errors.email} /> : null}
                <label htmlFor="email" className="block text-black text-sm font-bold mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-red-500"
                  placeholder="Email address"
                  value={formik.values.email}
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
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              <div className="mb-5">
                {formik.touched.confirmPassword && formik.errors.confirmPassword ? <ErrorForm value={formik.errors.confirmPassword} /> : null}
                <label htmlFor="confirmPassword" className="block text-black text-sm font-bold mb-2">Confirm password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-red-500"
                  placeholder="Repeat password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              <input
                type="submit"
                className="bg-red-500 hover:bg-gray-900 p-2 rounded-md text-white cursor-pointer w-full mt-3 font-bold uppercase"
                value="Create account"
              />
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateAccount;