import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Igrac } from 'src/entities/igrac.entity';
import { Tim } from 'src/entities/tim.entity';
import { Turnir } from 'src/entities/turnir.entity';
import { In, Not, Repository } from 'typeorm';
import { CreateTimDto, UpdateTimDto } from './DTOs';


@Injectable()
export class TimService {
    constructor(
        @InjectRepository(Tim) private readonly timRepository: Repository<Tim>,
        @InjectRepository(Igrac) private readonly igracRepository: Repository<Igrac>,
        @InjectRepository(Turnir) private readonly turnirRepository: Repository<Turnir>,

    ) { }

    async get(id: number): Promise<Tim> {
        try {
            const tim = await this.timRepository.findOne({
                where: {
                    id
                },
                relations: {
                    igrac: true,
                    turnir: true,
                },
                select: {
                    id: true,
                    naziv: true,
                    mesto: true,
                    igrac: {
                        id: true,
                        ime: true,
                        prezime: true,
                        email: true
                    },
                    turnir: {
                        id: true,
                        naziv: true,
                        mesto: true,
                        datum:true,
                        cenaUcesca:true,
                        nagradniFond:true,

                    }
                }
            })
            if (!tim) throw new NotFoundException("Tim ne postoji")
            return tim
        }
        catch (err) {
            console.log(err)
        }
    }

    async getAll(): Promise<Tim[]> {
        try {
            return await this.timRepository.find({
                relations: {
                    igrac: true,
                    turnir: true
                },
                select: {
                    igrac: {
                        ime: true
                    }
                }
            })
        }
        catch (err) {
            console.log(err)
        }
    }

    async create(tim: CreateTimDto) {
        try {
            const { naziv, mesto, brojIgraca, igraciIds,naziviTurnira } = tim
            const igrac: Igrac[] = await this.igracRepository.find({
                where: {
                    id: In(igraciIds)
                },
                relations: {
                    tim: true
                }
            })
            const turnir: Turnir[] = await this.turnirRepository.find({
                where: {
                    naziv: In(naziviTurnira)
                },
                relations: {
                    tim: true
                }
            })
            if (!igrac.length) throw new NotFoundException("Igraci sa datim id ne postoji")
            //if (!turnir.length) throw new NotFoundException("Moras uneti pravi turnir za ovaj tim")
            const noviTim: Tim = new Tim()
            noviTim.naziv = naziv
            noviTim.mesto = mesto
            noviTim.brojIgraca = brojIgraca
            noviTim.igrac = igrac
            noviTim.turnir = null

            await this.timRepository.save(noviTim)
            igrac.forEach(igrac => {
                igrac.tim=noviTim;
            })
            turnir.forEach(turnir => {
                turnir.tim.push(noviTim)
            })
            await this.igracRepository.save(igrac)
            await this.turnirRepository.save(turnir)
        }
        catch (err) {
            throw new Error(err)
        }
    }

    async update(id: number, timDto: UpdateTimDto): Promise<Tim> {
        try {
            let tim = await this.timRepository.findOneBy({ id })
            if (!tim) throw new NotFoundException("Tim sa zadatim id ne postoji")
            tim = {
                ...tim,
                ...timDto
            }
            return await this.timRepository.save(tim)
        }
        catch (err) {
            console.log(err)
        }
    }

    async delete(id: number) {
        try {
            const tim = await this.timRepository.findOne({
                where: {
                    id
                },
                relations: {
                    igrac: true,
                    turnir: true
                },
                select: {
                    id: true,
                    naziv: true,
                    mesto: true,
                    brojIgraca:true,
                    igrac: {
                        id: true
                    },
                    turnir: {
                        id: true,
                        tim:true
                    }
                }
            })
            if (!tim) throw new NotFoundException("Tim sa datim id ne postoji")

                         
            const igraci = tim.igrac
            for(const igrac of igraci)
            {
                igrac.tim=null;
                await this.igracRepository.save(igrac)

            }


            // sad mozda sam mogao i gore da ga pokupim preko veza, al mislim da je ovako citljivije
            const turniriTima = await this.turnirRepository.find({
                where: {
                    tim: {
                        id
                    }
                },
                relations: {
                    tim: true
                }
            })

            // u svakom turniru u njegovoj listi timova koje poseduje, filtriramo tim koji brisemo
            for (const turnir of turniriTima) {
                turnir.tim = turnir.tim.filter(timTurnir => timTurnir.id !== id)
                await this.turnirRepository.save(turnir)
            }





            return await this.timRepository.delete(id)
        }
        catch (err) {
            console.log(err)
        }
    }

    //return await this.timRepository.delete(id);
}

