import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        /**
         * Ejecutar codigo personalizado
         * Realizar operaciones con los objetos request y response
         * Finalizar el ciclo de la peticion
         * Continuar con el flujo normal
         * Si el middleware no finaliza la petición, debemos invocar la function next
         */

        console.log(req.method, req.baseUrl);   
        next();
    }
}
