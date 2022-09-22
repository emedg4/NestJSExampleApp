import { Injectable, Logger } from '@nestjs/common';
import * as Winston from 'winston';
import { Dias } from './enums/dias.enum';

@Injectable()
export class LoggerService extends Logger {
    public logger;

    constructor(){
        super();
        this.logger = Winston.createLogger({
            transports:[
                new Winston.transports.File({
                    filename: 'logs/info.log',
                    level: 'info'
                }),                
                new Winston.transports.File({
                    filename: 'logs/warn.log',
                    level: 'warn'
                }),
                new Winston.transports.File({
                    filename: 'logs/error.log',
                    level: 'error'
                }),
            ]
        });
    }
    
    public async error(message: string, trace?: any) {
        const now = await this.time();
        const error: any = {
            fecha: now,
            mensaje: message,
            traza: trace
        }
        this.logger.error(error)
        super.error(message, trace)
    }

    public async warn(message: string, trace?: any) {
        const now = await this.time();
        const warn: any = {
            fecha: now,
            mensaje: message,
            traza: trace
        }
        this.logger.warn(warn)
        super.warn(message, trace)
    }

    public async log(message: string, trace?: any) {
        const now = await this.time();
        const log: any = {
            fecha: now,
            mensaje: message,
            traza: trace
        }
        this.logger.info(log)
        super.log(message, trace )

    }

    public async time(){
        const date:Date = new Date();
        const diaDelMes: number = date.getDate();
        const mesDelAno: number = date.getMonth();
        const ano: number = date.getFullYear();
        const horaDelDia: number = date.getHours();
        const minutos: number = date.getMinutes();
        const segundos: number = date.getSeconds();
        const dia: string = Dias[date.getDay()];
        const fecha: any = `${dia} ${diaDelMes}/${mesDelAno}/${ano}, ${horaDelDia}:${minutos}:${segundos}`;
        return fecha;
    }


}
