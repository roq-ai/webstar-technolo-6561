import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface DigitalMarketingInterface {
  id?: string;
  seo?: string;
  sem?: string;
  ppc_campaigns?: string;
  smm?: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface DigitalMarketingGetQueryInterface extends GetQueryInterface {
  id?: string;
  seo?: string;
  sem?: string;
  ppc_campaigns?: string;
  smm?: string;
  user_id?: string;
}
