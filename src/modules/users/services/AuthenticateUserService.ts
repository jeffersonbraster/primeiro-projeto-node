import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import authconfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

export default class AuthenticateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    // Verifica se o e-mail existe, pesquisando no banco

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('E-mail/password incorreto.', 401);
    }

    // verifica se a senha que o usuário digitou é a mesma cryto do banco usando o compare do bcrypt

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('E-mail/password incorreto.', 401);
    }

    const { secret, expiresIn } = authconfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    // usuário autenticado

    return {
      user,
      token,
    };
  }
}
