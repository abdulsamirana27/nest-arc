import { Global, Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@services/config.service";
import { JwtStrategy } from "@services/jwt.strategy";
import { QueryService } from "@services/query.service";

const providers =[
    ConfigService,
    JwtStrategy,
    JwtService,
    QueryService
]
@Global()
@Module({
    imports: [],
    providers: [...providers],
    exports:[...providers],
})
export class SharedModule {}