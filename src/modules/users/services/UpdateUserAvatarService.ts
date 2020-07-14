import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import uploadConfig from '../config/upload';
import User from '../models/User';

import AppError from '../errors/AppError';

interface Request {
  user_id: string;
  avatarFileName: string;
}

export default class updateUserAvatarService {
  public async execute({ user_id, avatarFileName }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError(
        'Não foi possivel autenticar usuário para mudar o avatar',
        401,
      );
    }

    if (user.avatar) {
      // deletar avatar anterior

      const userAvatarFIlePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFIleExist = await fs.promises.stat(userAvatarFIlePath);

      if (userAvatarFIleExist) {
        await fs.promises.unlink(userAvatarFIlePath);
      }
    }

    user.avatar = avatarFileName;

    await usersRepository.save(user);

    return user;
  }
}
