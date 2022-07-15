import * as Yup from 'yup';

const linkSchema = Yup.object({
  filename: Yup.string()
    .required('Upload a file.'),
  originalName: Yup.string()
    .required('Upload a file.')
});

export default linkSchema;