import { ResponseData } from '@dtos/response/response';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class HttpInterceptor implements NestInterceptor {
  constructor(){}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map(data=>this.transformData(data)));
  }
  transformData(data:any){
    if(typeof data == 'object'){
      // for file
      // if(data.stream)
      // { 
      //   return data;
      // }
      var resp:ResponseData={
        message : '',
        success : true,
        data : data,
      };
    }
    else{
      var resp:ResponseData={
        message : data,
        success : false,
      };
    }
    return resp;
  }
  
}
