import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface VisualInterface {
  id?: string;
  image: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface VisualGetQueryInterface extends GetQueryInterface {
  id?: string;
  image?: string;
  user_id?: string;
}
