import * as yup from 'yup';

export const visualValidationSchema = yup.object().shape({
  image: yup.string().required(),
  user_id: yup.string().nullable(),
});
