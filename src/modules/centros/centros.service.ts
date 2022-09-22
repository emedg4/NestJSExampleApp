import { Injectable } from '@nestjs/common';
import { CreateCentroDTO } from './dto/create-centro.dto';
import { UpdateCentroDTO } from './dto/update-centro.dto';
import { Centro } from './entities/centro.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationCentroDTO } from './dto/pagination-centro.dto';

@Injectable()
export class CentrosService {

    constructor(
        @InjectRepository(Centro) private centrosRepository: Repository<Centro>
    ) { }

    public async create(centro : Centro , createCentroDTO: CreateCentroDTO): Promise<Centro> {
        const obj_centro = (!centro ?this.centrosRepository.create(createCentroDTO) : this.centrosRepository.merge(centro, createCentroDTO));
        return await this.centrosRepository.save(obj_centro); 
    }

    public async findOne(num_centro: number): Promise<Centro> {
        return await this.centrosRepository.findOne(num_centro,{where: {opt_centro: true}});
    }

    public async findAll(): Promise<Centro[]> {
        return await this.centrosRepository.find({where: { opt_centro: true}});
    }


    public async findPagination(take:number, skip:number): Promise<PaginationCentroDTO> {
        const pagination = new PaginationCentroDTO();
        [pagination.centros , pagination.total] = await this.centrosRepository.findAndCount({
            where: { opt_centro: true},
            take: take,
            skip: skip
        });
        
        return pagination;
    }

    public async findByNumCentro(num_centro: number): Promise<Centro> {
        return await this.centrosRepository.findOne({ num_centro: num_centro })
    }

    public async updateStatus(centro: Centro , updateCentroDTO: UpdateCentroDTO): Promise<Centro> {
        const updateCentro = this.centrosRepository.merge(centro, updateCentroDTO);
        return await this.centrosRepository.save(updateCentro);
    }
}
