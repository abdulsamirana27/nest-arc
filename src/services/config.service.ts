import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist';
import * as dotenv from 'dotenv';
export class ConfigService {
    constructor(){
        dotenv.config({
            path:`.${this.nodeEnv}.env`
        });
    }
    public get(key: string): string {
        return process.env[key];
    }
    public getNumber(key: string): number {
        return Number(this.get(key));
    }
    get nodeEnv(): string {
        return 'development';
        // return this.get('NODE_ENV') || 'production';
    }
    get typeOrmConfig(): TypeOrmModuleOptions {
        return {
            keepConnectionAlive: true,
            type: 'mysql',
            host: this.get('MYSQL_HOST'),
            port: this.getNumber('MYSQL_PORT'),
            username: this.get('MYSQL_USERNAME'),
            // password: this.get('MYSQL_PASSWORD'),
            database: this.get('MYSQL_DATABASE'),
            synchronize: false,
            logging: true,
            timezone:'Z'
        };
    }
}
