import path from 'path';
import { injectable, inject } from 'tsyringe';
import fs from 'fs';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  avatarFileName: string;
}
@injectable()
export default class updateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

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

    await this.usersRepository.save(user);

    return user;
  }
}
