import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Moderator } from 'src/entities/moderator.entity';
import { Organizator } from 'src/entities/organizator.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class OrganizatorService extends UserService<Organizator>{
    constructor(@InjectRepository(Organizator) private readonly organizatorRepository: Repository<Organizator>){
        //private readonly timService: TimService) {
        super(organizatorRepository);
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