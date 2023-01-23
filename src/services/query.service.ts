import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class QueryService {
    constructor(private _dataSource:DataSource){
    }
    async select(query:string, data:any[], isSp:boolean){
        const _data = await this._dataSource.manager.query(query,[...data]);
        if(isSp){
            return _data[0];
        }
        return _data;
    }
    async selectSingle(query:string, data:any[], isSp:boolean){
        const _data = (await this._dataSource.manager.query(query,[...data]))[0];
        if(isSp){
            return _data[0];
        }
        return _data;
    }

}
