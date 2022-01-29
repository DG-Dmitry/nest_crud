import { ApiProperty } from '@nestjs/swagger'
import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator'

export default class UpdateUserDto {
  @ApiProperty({ example: 'Alexander', description: 'User name' })
  @IsString()
  @Length(3, 255)
  @IsOptional()
  readonly name?: string

  @ApiProperty({ example: 'new@mail.com', description: 'Email' })
  @IsEmail()
  @IsOptional()
  readonly email?: string

  @ApiProperty({ example: '+79682636020', description: 'Phone number' })
  @IsPhoneNumber()
  @IsOptional()
  readonly phoneNumber?: string
}
