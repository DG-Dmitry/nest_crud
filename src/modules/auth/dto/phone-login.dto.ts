import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsPhoneNumber, IsString, Length } from 'class-validator'

export default class PhoneLoginDto {
  @ApiProperty({ example: '+79682633380', description: 'Phone number' })
  @IsPhoneNumber()
  @IsOptional()
  readonly phoneNumber: string

  @ApiProperty({ example: '12345678', description: 'Password' })
  @IsString()
  @Length(8, 64)
  readonly password: string
}
