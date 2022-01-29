import { ApiProperty } from '@nestjs/swagger'
import {
  IsEmail,
  IsString,
  Length,
  IsPhoneNumber,
  IsOptional,
} from 'class-validator'

export default class CreateUserDto {
  @ApiProperty({ example: 'Dmitry', description: 'User name' })
  @IsString()
  @Length(3, 255)
  readonly name: string

  @ApiProperty({ example: 'dmitry@mail.com', description: 'Email' })
  @IsEmail()
  @IsOptional()
  readonly email?: string

  @ApiProperty({ example: '+79682633380', description: 'Phone number' })
  @IsPhoneNumber()
  @IsOptional()
  readonly phoneNumber?: string

  @ApiProperty({ example: '12345678', description: 'Password' })
  @IsString()
  @Length(8, 64)
  readonly password: string
}
