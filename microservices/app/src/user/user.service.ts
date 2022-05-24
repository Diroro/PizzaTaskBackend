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

  async findOne(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({id});
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      select: ['email', 'hashedPassword', 'address', 'phoneNumber', 'firstName', 'lastName', 'id'],
      where: {
        email,
      },
    });
  }

  async saveUser(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async deleteUser(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }
}
