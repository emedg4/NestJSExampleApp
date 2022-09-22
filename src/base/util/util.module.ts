import { Module } from '@nestjs/common';
import { XmlParser } from './xmlParser.service';

@Module({
    providers:[XmlParser],
    exports:[XmlParser]
})


export class UtilModule {}
