import { User } from '../../user/user.type';

export type DecodedToken = {
  sub: string;
  email: string;
  profile: User;
};
