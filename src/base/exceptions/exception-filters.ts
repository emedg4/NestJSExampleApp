import { ExceptionFilter,Catch,ArgumentsHost,HttpException,HttpStatus} from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';
  
  @Catch()
  export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private logger: LoggerService){ this.logger.setContext("ExceptionFilters") }

    catch(exception: unknown, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const request = ctx.getRequest();
            
      this.logger.error(`${request.method} ${request.url}`, exception);

       const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;

          const respuesta =
        exception instanceof HttpException
          ? exception.getResponse()
         : 'Internal server error';

         if(typeof respuesta === 'string'){
          response.status(status).json({
            statusCode: status,
            message: respuesta
          }); 
         }
         
        response.status(status).json(respuesta);      
    }
  }