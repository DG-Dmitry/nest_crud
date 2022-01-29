import { ApiProperty } from '@nestjs/swagger'

export default class OkType {
  @ApiProperty({
    example: true,
    description: 'Success response',
  })
  public ok: boolean

  public static get success(): OkType {
    return { ok: true }
  }
}
