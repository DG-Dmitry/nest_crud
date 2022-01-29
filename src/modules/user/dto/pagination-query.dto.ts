import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsInt, IsPositive, Max } from 'class-validator'
import { Type } from 'class-transformer'

export default class PaginationQueryDto {
  @ApiProperty({ example: 1, description: 'Page' })
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @IsOptional()
  readonly page?: number

  @ApiProperty({ example: 10, description: 'Limit' })
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @IsOptional()
  @Max(100)
  readonly limit?: number

  @ApiProperty({ example: 'Dmitry', description: 'Search field' })
  @IsOptional()
  readonly searchString?: string
}
