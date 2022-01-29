import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Scope,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { User } from './user.model'
import { Op, Transaction } from 'sequelize'
import { REQUEST } from '@nestjs/core'
import { Request } from 'express'
import OkType from '../../types/Ok'

@Injectable({ scope: Scope.REQUEST })
export class UserService {
  constructor(
    @InjectModel(User) private model: typeof User,
    @Inject(REQUEST) private readonly req: Request,
  ) {}

  async create(
    createUserData: {
      name: string
      password: string
      email?: string
      phoneNumber?: string
    },
    transaction?: Transaction,
  ): Promise<User> {
    const { email, phoneNumber } = createUserData

    if (!email && !phoneNumber)
      throw new HttpException(
        'Password or phone number must be set',
        HttpStatus.BAD_REQUEST,
      )

    const phoneCondition = phoneNumber ? { phoneNumber } : {}
    const emailCondition = email ? { email } : {}

    const isAlreadyExist = await this.model.count({
      where: {
        [Op.or]: [emailCondition, phoneCondition],
      },
      transaction,
    })

    if (isAlreadyExist)
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.BAD_REQUEST,
      )

    return this.model.create(createUserData, { transaction })
  }

  async delete(id: string): Promise<OkType> {
    const transaction = this.req.transaction

    const success = await this.model.destroy({
      where: { id },
      transaction,
    })

    if (success) return OkType.success

    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.BAD_REQUEST,
    )
  }

  async update(
    id: string,
    userData: { name?: string; email?: string; phoneNumber?: string },
  ): Promise<User> {
    const user = await this.model.findByPk(id)

    if (!user)
      throw new HttpException(
        'User with this id does not exist',
        HttpStatus.NOT_FOUND,
      )

    await user.update(userData)

    return user
  }

  async get(id: string): Promise<User> {
    const user = await this.model.findByPk(id)

    if (!user)
      throw new HttpException(
        'User with this id does not exist',
        HttpStatus.NOT_FOUND,
      )

    return user
  }

  async getAll({
    page = 1,
    limit = 10,
    searchString,
  }: {
    page?: number
    limit?: number
    searchString?: string
  }): Promise<{ rows: User[]; count: number }> {
    const where = searchString
      ? {
          [Op.or]: [
            { name: { [Op.like]: `%${searchString}%` } },
            { email: { [Op.like]: `%${searchString}%` } },
          ],
        }
      : null

    return this.model.findAndCountAll({
      where,
      order: [['name', 'DESC']],
      offset: (page - 1) * limit,
      limit,
    })
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.model.findOne({ where: { email } })
  }

  async getUserByPhoneNumber(phoneNumber): Promise<User> {
    return this.model.findOne({
      where: {
        phoneNumber,
      },
    })
  }

  async getUserByEmailWithPassword(email: string): Promise<User> {
    return this.model.scope('withPassword').findOne({ where: { email } })
  }

  async getUserByPhoneNumberWithPassword(phoneNumber): Promise<User> {
    return this.model.scope('withPassword').findOne({
      where: {
        phoneNumber,
      },
    })
  }
}
