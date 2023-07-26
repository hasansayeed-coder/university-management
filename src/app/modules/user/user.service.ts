import config from '../../../config/index';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateUserId } from './user.utils';

const createUser = async (user: IUser): Promise<IUser | null> => {
  // auto generated id
  // default password

  const id = await generateUserId();

  user.id = id.toString();

  if (!user.password) {
    user.password = config.default_user_pass as string;
  }

  const createdUser = await User.create(user);

  if (!createdUser) {
    throw new ApiError(400, 'Failed to create User!');
  }

  return createdUser;
};

export const UserService = {
  createUser,
};

// req , res handle krbe controller not service only business logic is here
