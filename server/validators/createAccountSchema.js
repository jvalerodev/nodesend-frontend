import * as Yup from 'yup';

const createAccountSchema = Yup.object({
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
});

export default createAccountSchema;