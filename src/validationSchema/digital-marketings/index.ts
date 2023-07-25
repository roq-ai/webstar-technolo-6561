import * as yup from 'yup';

export const digitalMarketingValidationSchema = yup.object().shape({
  seo: yup.string(),
  sem: yup.string(),
  ppc_campaigns: yup.string(),
  smm: yup.string(),
  user_id: yup.string().nullable(),
});
