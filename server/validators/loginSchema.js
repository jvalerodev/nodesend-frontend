import * as Yup from 'yup';

const loginSchema = Yup.object({
  email: Yup.string()
    .required('Email address is required.')
    .email('Invalid email address.'),
  password: Yup.string()
    .required('Password is required.')
});

export default loginSchema;