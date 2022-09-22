import { CACHE_MANAGER, HttpService, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SsoApplicationService } from '../sso-application/sso-application.service';
import { CreateGuiaDTO } from './dto/Create-Guia.DTO';
import { DataDTO } from './dto/Data.DTO';
import { RastreoDTO } from './dto/Rastreo.DTO';
import { RemisionDTO } from './dto/Remision.DTO';
import { TrackingResponseDTO } from './dto/TrackingResponse.DTO';
import { TrackingResponseDetalleDTO } from './dto/TrackingResponseDetalle.DTO';
import { Cache } from 'cache-manager';
import { Tipo } from './enums/tipos.enum';

@Injectable()
export class ConsultaOmnicanalService {

    constructor(private readonly configService: ConfigService, private readonly httpService: HttpService,
        private readonly ssoAppService: SsoApplicationService, @Inject(CACHE_MANAGER) private cacheManager: Cache   
    ) {}

    public async consultarTrackingOmnicanalPorOrden(orden: string): Promise<TrackingResponseDTO> {
        const token = await this.obtenerTokenApp();

        const consultaOmnicanal = await this.consumirApiTracking(token , orden);

        if(consultaOmnicanal.meta.statusCode !== 200){
            return consultaOmnicanal;
        }
            
        if(consultaOmnicanal.data != null){
            consultaOmnicanal.data.rastreo = await this.obtenerNuevoRastreo(consultaOmnicanal.data);
        }

        return consultaOmnicanal;
    }

    public async obtenerTokenApp():Promise<string>{
        let token = ''
        if(await this.cacheManager.get('token_app') != undefined){
            const validation = await this.ssoAppService.validation(await this.cacheManager.get('token_app'));
            if(validation){
                if(validation.meta.status == "SUCCESS"){
                    token = await this.cacheManager.get('token_app');
                }else {
                    if(validation.meta.error.errorCode == 401){
                        token = await this.ssoAppService.authentication();
                    }
                }
            }
        }else{
            token = await this.ssoAppService.authentication();
        }

        return token;
    }

    private async consumirApiTracking(token: string , folioOmnicanal : string): Promise<TrackingResponseDTO>{ 
        return new Promise((resolve, reject) => {
            this.httpService
            .get(`${this.configService.get('tracking_url')}/${folioOmnicanal}`, {
                headers: { Authorization: token },
                timeout: 10000
            }).toPromise().then(response => {
                resolve(response.data);
            })
            .catch(error => {
                resolve(error.response.data);
            });
        })
    }

    private async obtenerNuevoRastreo(data : DataDTO):Promise<any>{
        return data.rastreo.map((rastreo: RastreoDTO) => {
            return {
                direccion: rastreo.direccion,
                tipo: rastreo.tipo,
                nom_tienda: rastreo.nom_tienda,
                guias: this.obtenerGuias(rastreo)
            }
        });
    }

    private obtenerGuias(rastreo : RastreoDTO){
        let idCounter = 0;
        return rastreo.guias.map((guia: CreateGuiaDTO) => {
            return {
                tipoPorArticulo: rastreo.tipo,
                id: ++idCounter,
                guia: guia.guia,
                paquetera: guia.paquetera,
                articulos: guia.articulos,
                movimientos: guia.movimientos,
                link_rastreo: guia.link_rastreo,
                fecha_promesa: guia.fecha_promesa
            }
        });
    }

    public async consultarTrackingDetalle(respuestaOmnicanal : TrackingResponseDTO , id : string , codigoArticulo : string):Promise<TrackingResponseDetalleDTO>{
        let trackingDetalle = new TrackingResponseDetalleDTO();
        respuestaOmnicanal.data.rastreo.forEach(rastreo => {
            this.consultarTrackingTipo(rastreo, respuestaOmnicanal.data.pedido.remision , trackingDetalle);
            this.consultarTrackingId(rastreo , id , codigoArticulo, trackingDetalle);
        });

        trackingDetalle.num_orden = respuestaOmnicanal.data.pedido.num_orden;
        trackingDetalle.cliente = respuestaOmnicanal.data.cliente;
        trackingDetalle.entrega = respuestaOmnicanal.data.entrega;
        trackingDetalle.pedido = respuestaOmnicanal.data.pedido;

        return trackingDetalle;
    }

    private async consultarTrackingTipo(rastreo : RastreoDTO , remision : RemisionDTO , trackingDetalle : TrackingResponseDetalleDTO):Promise<void>{        
        switch (rastreo.tipo) {
            case "ENTREGADOMICILIOMARKETPLACE": {
                trackingDetalle.tipo = Tipo.ENTREGADOMICILIOMARKETPLACE;
                trackingDetalle.entrega_en = "DOMICILIO";
                break;
            }
            case "ENTREGADOMICILIOROPA": {
                trackingDetalle.tipo = Tipo.ENTREGADOMICILIOROPA;
                trackingDetalle.entrega_en = "DOMICILIO";
                trackingDetalle.remision = remision.ropa;
                break;
            }
            case "ENTREGATIENDAROPA": {
                trackingDetalle.tipo = Tipo.ENTREGATIENDAROPA;
                trackingDetalle.entrega_en = "TIENDA";
                trackingDetalle.remision = remision.ropa;
                break;
            }
            case "ENTREGADOMICILIOMUEBLES": {
                trackingDetalle.tipo = Tipo.ENTREGADOMICILIOMUEBLES;
                trackingDetalle.entrega_en = "DOMICILIO";
                trackingDetalle.remision = remision.muebles;
                break;
            }
            case "ENTREGATIENDAMUEBLES": {
                trackingDetalle.tipo = Tipo.ENTREGATIENDAMUEBLES;
                trackingDetalle.entrega_en = "TIENDA";
                trackingDetalle.remision = remision.muebles;
                break;
            }
        }
    }

    private async consultarTrackingId(rastreo : RastreoDTO , id : string , codigoArticulo : string , trackingDetalle : TrackingResponseDetalleDTO):Promise<void>{
        rastreo.guias.forEach((guia:CreateGuiaDTO) => {
            if ((guia.id).toString() == id) {
                trackingDetalle.guia = guia.guia;
                trackingDetalle.paquetera = (guia.paquetera ? guia.paquetera : null);
                trackingDetalle.fecha_promesa = (guia.fecha_promesa ? guia.fecha_promesa : null);
                trackingDetalle.link_rastreo = (guia.link_rastreo ? guia.link_rastreo : null);
                trackingDetalle.movimientos = guia.movimientos;

                guia.articulos.forEach(articulo => {
                    if (articulo.codigo == codigoArticulo) {
                        trackingDetalle.articulos = articulo;
                    }

                });

            }
        });
    }
}
