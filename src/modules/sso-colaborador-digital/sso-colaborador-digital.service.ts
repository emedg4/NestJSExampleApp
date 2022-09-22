import { Injectable, HttpService} from "@nestjs/common";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SSOColaboradorDigitalService {
    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService
    ) {}

    async authentication(user: string, password: string): Promise<any> {
        const [ host, path, loginType ] = [
            this.configService.get('sso.colaborador_digital.host'),
            this.configService.get('sso.colaborador_digital.path.login'),
            this.configService.get('sso.colaborador_digital.loginType')
        ];

        const options = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const body = {
            'logonId': user,
            'logonPassword': password,
            'loginType': loginType
        };

        const url = `${host}${path}`;
            
        return new Promise((resolve, reject) => {
            this.httpService
            .post(url , body , options).toPromise().then(response => {
                resolve(response);
            })
            .catch(error => {
                if(error.response.status == 400){
                    resolve(error.response);
                }    
                resolve(null);
            });
        })
    }

    async validation(bearer:string):Promise<any> {
        const [ host, path ] = [
            this.configService.get('sso.colaborador_digital.host'),
            this.configService.get('sso.colaborador_digital.path.validate'),
        ];

        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': bearer
            }
        };

        const url = `${host}${path}`;

        return new Promise((resolve, reject) => {
            this.httpService
            .get(url, options).toPromise().then(response => {
                resolve(response.data);
            })
            .catch(error => {
                if(error.response.status == 400){
                    resolve(error.response.data);
                }    
                resolve(null);
            });
        })
    }    
}
