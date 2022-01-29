import {
  Column,
  DataType,
  DefaultScope,
  Model,
  Scopes,
  Table,
} from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'

interface UserCreationAttrs {
  name: string
  email: string
  phoneNumber: string
  password: string
}

@DefaultScope(() => ({
  attributes: {
    exclude: ['password'],
  },
}))
@Scopes(() => ({
  withPassword: {
    attributes: { include: ['password'] },
  },
}))
@Table({
  tableName: 'users',
  underscored: true,
  validate: {
    bothCoordsOrNone() {
      if (!this.phoneNumber && !this.email) {
        throw new Error('Either email or phone number must be specified')
      }
    },
  },
})
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({
    example: '4b3b28ae-83b3-4666-8db4-37c2d4c62ebe',
    description: 'UUID',
  })
  @Column({
    type: DataType.UUIDV4,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string

  @ApiProperty({
    example: 'Dmitry',
    description: 'User name',
  })
  @Column({ type: DataType.STRING })
  name: string

  @ApiProperty({
    example: 'example@mail.com',
    description: 'Email',
  })
  @Column({ type: DataType.CITEXT, unique: true })
  email: string

  @ApiProperty({
    example: '+89682633380',
    description: 'Phone number',
  })
  @Column({ type: DataType.STRING, unique: true })
  phoneNumber: string

  @ApiProperty({
    example: '12345678',
    description: 'Password',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string

  @ApiProperty({
    example: '2022-01-23 19:54:03.787000 +00:00',
    description: 'User creation date',
  })
  @Column({ type: DataType.DATE, allowNull: false })
  createdAt: string

  @ApiProperty({
    example: '2022-01-23 19:54:03.787000 +00:00',
    description: 'User update date',
  })
  @Column({ type: DataType.DATE, allowNull: false })
  updatedAt: string
}
