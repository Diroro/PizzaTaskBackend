import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

export enum ProductType {
  pizza = 'pizza',
  pasta = 'pasta',
}

@Entity()
export class Product {
  constructor(
    type: ProductType,
    name: string,
    description: string,
    image: string,
    priceEUR: number,
  ) {
    this.type = type;
    this.name = name;
    this.description = description;
    this.image = image;
    this.priceEUR = priceEUR;
  }

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'enum',
    enum: ProductType,
    default: ProductType.pizza,
  })
  type: ProductType;

  @Column('varchar', {length: 100})
  name: string;

  @Column('varchar', {length: 255})
  description: string;

  @Column('varchar')
  image: string;

  @Column('float') // MAKE THIS NOT INT BUT FLOAT / DOUBLE
  priceEUR: number;
}
