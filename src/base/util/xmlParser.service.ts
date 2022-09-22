import { Injectable } from '@nestjs/common';
import * as xml2json from 'xml2json';

@Injectable()
export class XmlParser {

    public async parseXmlToJson(body:any):Promise<any> {
    // const text = await body.text();//comentado mientras que se usa mock
    const jsonText:string = await xml2json.toJson(body.data);
    const json:Object = await JSON.parse(jsonText);
    return json;

    }
}
