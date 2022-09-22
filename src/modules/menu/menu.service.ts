import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from './entities/menu.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu) private menuRepository: Repository<Menu>
  ) { }

  public async findAll(opt_admin: boolean): Promise<Menu[]> {
    return await this.menuRepository.find({
      where: !opt_admin?{opt_is_admin : opt_admin}:{},
      order: {idu_menu: "ASC"}
    });
  }
}
