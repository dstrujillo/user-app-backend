import { type User, UserModel } from '@/models/user.models';

export const createUserService = async (user: User): Promise<User> => {
  return await UserModel.create(user);
};
