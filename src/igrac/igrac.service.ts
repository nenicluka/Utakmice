import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Igrac } from 'src/entities/igrac.entity';
import { TimService } from 'src/tim/tim.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class IgracService extends UserService<Igrac>{
    constructor(@InjectRepository(Igrac) private readonly readerRepository: Repository<Igrac>){
        //private readonly timService: TimService) {
        super(readerRepository);
    }

    async delete(id: number): Promise<void> {
        try {
            //await this.timService.deleteAllReviewsFromReader(id)
        }
        catch (err) {
            console.log(err)
        }
    }
}