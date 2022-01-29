import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
} from '@nestjs/common'
import { UserService } from './user.service'
import CreateUserDto from './dto/create-user.dto'
import UpdateUserDto from './dto/update-user.dto'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { User } from './user.model'
import { ValidationPipe } from '../../pipes/validation.pipe'
import PaginationQueryDto from './dto/pagination-query.dto'
import OkType from '../../types/Ok'

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 200, type: User })
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto)
  }

  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, type: User })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, updateUserDto)
  }

  @ApiOperation({ summary: 'Get user' })
  @ApiResponse({ status: 200, type: User })
  @Get(':id')
  get(@Param('id') id: string) {
    return this.userService.get(id)
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @UsePipes(ValidationPipe)
  @Get()
  getAll(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.userService.getAll(paginationQueryDto)
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 200, type: OkType })
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(id)
  }
}
