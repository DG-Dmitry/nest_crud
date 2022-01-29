import { ApiProperty } from '@nestjs/swagger'

export default class AuthType {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI4NTA2MTFiLTMyYjMtNDgzMy04YWE5LTliZTVmY2NmYjg2NyIsImVtYWlsIjoiZXhhbXBsZUBtYWlsLmNvbSIsInBob25lTnVtYmVyIjoiKzc5NjgyNjMzMzgwIiwiaWF0IjoxNjQzNTY0Nzk0LCJleHAiOjE2NDM2NTExOTR9.mmWgyhE96GL8z0paVbcnqTcAFbx8_kPGAHrrUCw7fdc',
    description: 'Jwt token',
  })
  public token: string
}
