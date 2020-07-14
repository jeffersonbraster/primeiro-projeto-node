import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    const hashedpass = await hash(password, 8);

    if (checkUserExists) {
      throw new AppError('Email do usuário já está sendo usado.');
    }

    const user = usersRepository.create({
      name,
      email,
      password: hashedpass,
    });

    await usersRepository.save(user);

    return user;
  }
}