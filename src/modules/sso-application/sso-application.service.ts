import { CACHE_MANAGER, HttpService, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';


@Injectable()
export class SsoApplicationService {
    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache  
    ) {}

    async authentication(): Promise<any> {
        const [ host, path , appId , appKey ] = [
            this.configService.get('sso.aplicativos.host'),
            this.configService.get('sso.aplicativos.path.login'),
            this.configService.get('sso.aplicativos.appId'),
            this.configService.get('sso.aplicativos.appKey')
        ];

        const options = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const body = {
            'appId': appId,
            'appKey': appKey,
        };

        const url = `${host}${path}`;
        const response = await this.httpService
            .post(url, body, options)
            .toPromise();

        this.cacheManager.set('token_app', response.data.data.token);   

        return response.data.data.token;
    }

    async validation(bearer:string):Promise<any> {
        const [ host, path ] = [
            this.configService.get('sso.aplicativos.host'),
            this.configService.get('sso.aplicativos.path.validate'),
        ];

        const options = {
            headers: { 
                Authorization: bearer,
                'Content-Type': 'application/json'
            }
        }

        const url = `${host}${path}`;

        return new Promise((resolve, reject) => {
            this.httpService
            .post(url, {} , options).toPromise().then(response => {
                resolve(response.data);
            })
            .catch(error => {
                resolve(error.response.data);
            });
        })
    }  

}