import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { SSOColaboradorDigitalService } from "../../modules/sso-colaborador-digital/sso-colaborador-digital.service";
import { Cache } from 'cache-manager';

@Injectable()
export class AuthService {
    constructor(private ssoColaboradorDigital:SSOColaboradorDigitalService,@Inject(CACHE_MANAGER) private cacheManager: Cache ){}
    
    async authorization(bearer: string) {
        let result = false; 
        const validation = await this.ssoColaboradorDigital.validation(bearer);
        if(validation){
            if(validation.meta.status == "SUCCESS"){
                if(await this.cacheManager.get(validation.data.email)){
                    if((await this.cacheManager.get(validation.data.email))['token'] == bearer){
                        result = true
                    } 
                }
            }
        }
        return result;
    }

    async validateUser(username: string, password: string): Promise<any> {
        const info = await this.ssoColaboradorDigital.authentication(username, password);
        return info;
    }
}
