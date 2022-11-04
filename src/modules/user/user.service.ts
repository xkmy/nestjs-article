import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDTO, LoginDTO } from './user.dto';
import { makeSalt, encryptPassword } from 'src/utilts/crypto';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async checkRegisterForm(registerDTO: RegisterDTO): Promise<any> {
    const { mobile } = registerDTO;
    const hasUser = await this.userRepository.findOneBy({ mobile });
    if (hasUser) {
      throw new NotFoundException('用户已存在');
    }
  }

  // 注册
  async register(registerDTO: RegisterDTO): Promise<any> {
    await this.checkRegisterForm(registerDTO);

    const { username, password, mobile } = registerDTO;
    const salt = makeSalt();
    const hashPassword = encryptPassword(password, salt);

    const newUser: User = new User();
    newUser.username = username;
    newUser.mobile = mobile;
    newUser.password = hashPassword;
    newUser.salt = salt;
    const result = await this.userRepository.save(newUser);
    delete result.password;
    delete result.salt;

    return result;
  }

  async checkLoginForm(loginDTO: LoginDTO): Promise<any> {
    const { mobile, password } = loginDTO;
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.salt')
      .addSelect('user.password')
      .where('user.mobile = :mobile', { mobile })
      .getOne();

    if (!user) throw new NotFoundException('用户不存在');

    const { password: dbPassword, salt } = user;
    const currentHashPassword = encryptPassword(password, salt);
    if (currentHashPassword !== dbPassword) {
      throw new NotFoundException('密码错误');
    }

    return user;
  }

  createToken(user: User) {
    const token = this.jwtService.sign({
      id: user.id,
      username: user.username,
      mobile: user.mobile,
    });
    return token;
  }

  async login(loginDTO: LoginDTO): Promise<any> {
    const user = await this.checkLoginForm(loginDTO);
    const token = this.createToken(user);
    return token;
  }
}
