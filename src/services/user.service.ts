import { type User, UserModel } from '@/models/user.models';

export const createUserService = async (user: User): Promise<User> => {
  return await UserModel.create(user);
};

export const getUsersService = async (): Promise<User[]> => {
  return await UserModel.find();
};

export const getOneUserService = async (
  query: Partial<User>
): Promise<User | null> => {
  console.log(query);
  return await UserModel.findOne({ query });
};
