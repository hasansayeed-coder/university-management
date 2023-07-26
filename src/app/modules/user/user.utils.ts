import { User } from './user.model';

export const findLastUserId = async () => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();

  return lastUser?.id;
};

export const generateUserId = async () => {
  ///00012 +1 = 00013
  const currentId = (await findLastUserId()) || (0).toString().padStart(5, '0'); //00000

  const incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');

  return incrementedId;

  //   currentUserId++;
  //   const paddedId = currentUserId.toString().padStart(5, '0');
  //   return `user${paddedId}`;
};
