import { Body, Controller, Post, UsePipes } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import EmailRegistrationDto from './dto/email-registration.dto'
import EmailLoginDto from './dto/email-login.dto'
import PhoneRegistrationDto from './dto/phone-registration.dto'
import PhoneLoginDto from './dto/phone-login.dto'
import { ValidationPipe } from '../../pipes/validation.pipe'
import AuthType from '../../types/Auth'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Login by email' })
  @ApiResponse({ status: 200, type: AuthType })
  @UsePipes(ValidationPipe)
  @Post('/email-login')
  loginByEmail(@Body() loginByEmailDto: EmailLoginDto) {
    return this.authService.loginByEmail(
      loginByEmailDto.email,
      loginByEmailDto.password,
    )
  }

  @ApiOperation({ summary: 'Login by phone number' })
  @ApiResponse({ status: 200, type: AuthType })
  @UsePipes(ValidationPipe)
  @Post('/phone-login')
  async loginByPhone(@Body() loginByPhoneDto: PhoneLoginDto) {
    return this.authService.loginByPhoneNumber(
      loginByPhoneDto.phoneNumber,
      loginByPhoneDto.password,
    )
  }

  @ApiOperation({ summary: 'Registration by email' })
  @ApiResponse({ status: 200, type: AuthType })
  @UsePipes(ValidationPipe)
  @Post('/email-registration')
  registrationByEmail(@Body() emailRegistrationDto: EmailRegistrationDto) {
    return this.authService.registrationByEmail(emailRegistrationDto)
  }

  @ApiOperation({ summary: 'Registration by phone number' })
  @ApiResponse({ status: 200, type: AuthType })
  @UsePipes(ValidationPipe)
  @Post('/phone-registration')
  registrationByPhone(@Body() phoneRegistrationDto: PhoneRegistrationDto) {
    console.log(phoneRegistrationDto)
    return this.authService.registrationByPhone(phoneRegistrationDto)
  }
}
