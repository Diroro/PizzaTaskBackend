import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
import {Exclude, classToPlain} from 'class-transformer';

@Entity()
export class User {
  constructor(
    email: string,
    hashedPassword: string,
    address: string,
    phoneNumber: string,
    firstName?: string,
    lastName?: string,
  ) {
    this.email = email;
    this.hashedPassword = hashedPassword;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar', {length: 100})
  email: string;

  @Column('varchar', {
    select: false,
  })
  hashedPassword!: string;

  @Column('varchar', {length: 100, nullable: true})
  firstName?: string;

  @Column('varchar', {length: 100, nullable: true})
  lastName?: string;

  @Column('varchar', {length: 255})
  address: string;

  @Column('varchar', {length: 100})
  phoneNumber: string;
}
