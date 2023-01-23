import { Injectable } from '@nestjs/common';
import { QueryService } from "@services/query.service";

@Injectable()
export class AuthService {
  constructor(private queryService:QueryService) {
  }

  login(){
return "sam";


  }

}
