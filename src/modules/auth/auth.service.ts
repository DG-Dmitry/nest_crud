import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'
import PhoneRegistrationDto from './dto/phone-registration.dto'
import EmailRegistrationDto from './dto/email-registration.dto'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async loginByEmail(email: string, password: string) {
    const user = await this.userService.getUserByEmailWithPassword(email)

    if (user && (await this.comparePassword(password, user.password))) {
      return this.generateToken(user)
    }

    throw new UnauthorizedException({ message: 'Invalid login or password' })
  }

  async loginByPhoneNumber(phone: string, password: string) {
    const user = await this.userService.getUserByPhoneNumberWithPassword(phone)

    if (user && (await this.comparePassword(password, user.password))) {
      return this.generateToken(user)
    }

    throw new UnauthorizedException({ message: 'Invalid login or password' })
  }

  async registrationByEmail(emailRegistrationDto: EmailRegistrationDto) {
    const { email, password } = emailRegistrationDto

    const existedUser = await this.userService.getUserByEmail(email)

    if (existedUser) {
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.BAD_REQUEST,
      )
    }

    const hashedPassword = await this.hashPassword(password)

    const user = await this.userService.create({
      ...emailRegistrationDto,
      password: hashedPassword,
    })

    return this.generateToken(user)
  }

  async registrationByPhone(phoneRegistrationDto: PhoneRegistrationDto) {
    const { phoneNumber, password } = phoneRegistrationDto

    const user = await this.userService.getUserByPhoneNumber(phoneNumber)

    if (user) {
      throw new HttpException(
        'User with this phone number already exists',
        HttpStatus.BAD_REQUEST,
      )
    }

    const hashedPassword = await this.hashPassword(password)

    const newUser = await this.userService.create({
      ...phoneRegistrationDto,
      password: hashedPassword,
    })

    return this.generateToken(newUser)
  }

  private generateToken(payload: {
    id: string
    email?: string
    phoneNumber?: string
  }) {
    const { id, email, phoneNumber } = payload

    if (!email && !phoneNumber) return null
    return {
      token: this.jwtService.sign({
        id,
        email,
        phoneNumber,
      }),
    }
  }

  async hashPassword(password) {
    return bcrypt.hash(password, 5)
  }

  async comparePassword(password, hash) {
    if (!hash || !password) return false
    return bcrypt.compare(password, hash)
  }
}
