import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Response } from 'express';
import { ConfigService } from '@services/config.service';
@Catch(Error)
export class ErrorFilter implements ExceptionFilter {
    constructor(
        public reflector: Reflector,
        private _configService:ConfigService,
        ) {}

    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request:any = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();
        let statusCode =
            exception.constraint && exception.constraint.startsWith('UQ')
                ? HttpStatus.CONFLICT
                : exception.status?exception.status:HttpStatus.INTERNAL_SERVER_ERROR;
        var resp = {
            exception : '',
            message : exception?.message,
            success : false,
        }
    
        if(statusCode == HttpStatus.INTERNAL_SERVER_ERROR){
            resp.exception = exception?.stack;
        }
        response.status(statusCode).json(resp);
    }
}