import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Igrac } from 'src/entities/igrac.entity';
import { TimService } from 'src/tim/tim.service';
import { AuthService } from 'src/user/auth.service';
import { Repository } from 'typeorm';

@Injectable()
export class IgracService extends AuthService<Igrac>{
    constructor(@InjectRepository(Igrac) private readonly igracRepository: Repository<Igrac>)
    {
        super(igracRepository);
    }

    async delete(id: number): Promise<void> {
        try {
            this.igracRepository.delete(id);
        }
        catch (err) {
            console.log(err)
        }
    }

    async getAll(): Promise<Igrac[]> {
        try {
            return await this.igracRepository.find({
                relations: {
                    tim: true,
                },
                select: {
                    tim: {
                        naziv: true
                    }
                }
            })
        }
        catch (err) {
            console.log(err)
        }
    }
}