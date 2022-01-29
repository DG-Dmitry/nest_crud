import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, Length } from 'class-validator'

export default class EmailLoginDto {
  @ApiProperty({ example: 'example@mail.com', description: 'Email' })
  @IsEmail()
  readonly email: string
  @ApiProperty({ example: '12345678', description: 'Password' })
  @IsString()
  @Length(8, 64)
  readonly password: string
}
