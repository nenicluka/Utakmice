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
                        id: true
                    }
                }
            })
            if (!tim) throw new NotFoundException("Tim sa datim id ne postoji")

            // sad mozda sam mogao i gore da ga pokupim preko veza, al mislim da je ovako citljivije
            const turnirTim = await this.turnirRepository.find({
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
            for (const turnir of turnirTim) {
                turnir.tim = turnir.tim.filter(timTurnir => timTurnir.id !== id)
                await this.turnirRepository.save(turnir)
            }


            // // brisemo iz veze vise na vise, pa onda obrisemo tim
            await this.igracRepository.delete({
                tim: {
                    id
                }
            })

            // if (tim.igrac.length) {
            //     const igraci = await this.igracRepository.find({
            //         where: {
            //             id: In(Array(tim.igrac.length).fill(0).map((_, i) => tim.igrac[i].id))
            //         },
            //         relations: {
            //             tim: true
            //         },
            //         select: {
            //             id: true,
            //             ime: true,
            //             prezime: true,
            //             tim: {
            //                 id: true
            //             }
            //         }
            //     })

            //     for (const igrac of igraci) {
            //         igrac.tim = igrac.tim.filter(igracTim => igracTim.id !== id)
            //         // brisemo autora ukoliko nakon brisanja knjige nije napisao nijednu i updejtujemo
            //         // ocenu i broj recenzija
            //         author.rating = (author.rating * author.numberOfReviews - book.numberOfReviews * book.rating) / (author.numberOfReviews - book.numberOfReviews)
            //         author.numberOfReviews -= book.numberOfReviews
            //         if (!author.books.length) {
            //             await this.authorRepository.delete(author.id)
            //         }
            //         else
            //             await this.authorRepository.save(author)
            //     }
            // }

            return await this.timRepository.delete(id)
        }
        catch (err) {
            console.log(err)
        }
    }
}