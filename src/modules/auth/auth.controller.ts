import { Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "@modules/auth/auth.service";
import { ApiTags } from "@nestjs/swagger";

@Controller('auth')
@ApiTags("auth")
export class AuthController {


  constructor(private readonly authService: AuthService) {}

  @Post("/authenticate")
  login():any{
    return this.authService.login();
  }

}
