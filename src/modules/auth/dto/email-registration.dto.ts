import { ApiProperty } from '@nestjs/swagger'
import {
  IsString,
  IsPhoneNumber,
  IsOptional,
  IsEmail,
  Length,
} from 'class-validator'

export default class EmailRegistrationDto {
  @ApiProperty({ example: 'Dmitry', description: 'User name' })
  @IsString()
  @Length(3, 255)
  readonly name: string

  @ApiProperty({ example: 'example@mail.com', description: 'Email' })
  @IsEmail()
  readonly email: string

  @ApiProperty({ example: '+79682633380', description: 'Phone number' })
  @IsPhoneNumber()
  @IsOptional()
  readonly phoneNumber?: string

  @ApiProperty({ example: '12345678', description: 'Password' })
  @IsString()
  @Length(8, 64)
  readonly password: string
}
