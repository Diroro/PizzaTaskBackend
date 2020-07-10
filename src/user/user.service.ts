import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from './user.entity';
import {Repository, DeleteResult} from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User | undefined> {
    return this.userRepository.findOne(id);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', {email})
      .getOne();
  }

  async saveUser(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async deleteUser(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }
}
