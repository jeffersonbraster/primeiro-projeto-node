import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import authconfig from '../config/auth';
import User from '../models/User';

import AppError from '../errors/AppError';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

export default class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    // Verifica se o e-mail existe, pesquisando no banco

    const user = await usersRepository.findOne({ where: { email } });

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
