/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { LoginDto, SignUpDto } from './auth.dto';
import { User } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { UserResponseInterface } from '../user/user.interface';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async signup(signUpDto: SignUpDto): Promise<UserResponseInterface> {
    const { email, password, name } = signUpDto;

    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new HttpException(
        'Email is already in use',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userRepository.createUser({
      email,
      password: hashedPassword,
      name,
    });

    return {
      ...user,
      token: this.generateJwt(user),
    };
  }

  async login(loginDto: LoginDto): Promise<UserResponseInterface> {
    const { email, password } = loginDto;

    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return {
      ...user,
      token: this.generateJwt(user),
    };
  }

  private generateJwt(user: User): string {
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    return sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      jwtSecret,
      {
        expiresIn: '1h',
      },
    );
  }
}
