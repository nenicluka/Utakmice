import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Igrac } from 'src/entities/igrac.entity';
import { Tim } from 'src/entities/tim.entity';
import { Turnir } from 'src/entities/turnir.entity';
import { In, Not, Repository } from 'typeorm';
import { CreateTurnirDto, UpdateTurnirDto } from './DTOs';
import { Organizator } from 'src/entities/organizator.entity';


@Injectable()
export class TurnirService {
    constructor(
        @InjectRepository(Tim) private readonly timRepository: Repository<Tim>,
        @InjectRepository(Igrac) private readonly igracRepository: Repository<Igrac>,
        @InjectRepository(Turnir) private readonly turnirRepository: Repository<Turnir>,
        @InjectRepository(Organizator) private readonly organizatorRepository: Repository<Organizator>,

    ) { }

    async get(id: number): Promise<Turnir> {
        try {
            const turnir = await this.turnirRepository.findOne({
                where: {
                    id
                },
                relations: {
                    tim: true,
                    organizator: true,
                },
                select: {
                    id: true,
                    naziv: true,
                    tip:true,
                    opis:true,
                    mesto: true,
                    datum:true,
                    cenaUcesca:true,
                    nagradniFond:true,
                    brojTimova:true,
                    organizator: {
                        id: true,
                        ime: true,
                        prezime: true,
                        email: true
                    },
                    tim: {
                        id: true,
                        naziv: true,
                        mesto: true,
                        brojIgraca:true,
          

                    }
                }
            })
            if (!turnir) throw new NotFoundException("Turnir ne postoji")
            return turnir
        }
        catch (err) {
            console.log(err)
        }
    }

    async getAll(): Promise<Turnir[]> {
        try {
            return await this.turnirRepository.find({
                relations: {
                    organizator: true,
                    tim: true
                },
                select: {
                    organizator: {
                        ime: true
                    }
                }
            })
        }
        catch (err) {
            console.log(err)
        }
    }

    async create(turnir: CreateTurnirDto) {
        try {
            const { naziv, tip, opis, mesto,datum,cenaUcesca,nagradniFond,brojTimova,timoviIDS,organizatoriID } = turnir
            const tim: Tim[] = await this.timRepository.find({
                where: {
                    id: In(timoviIDS)
                },
                relations: {
                    turnir: true
                }
            })
            const organizator: Organizator[] = await this.organizatorRepository.find({
                where: {
                    id: In(organizatoriID)
                },
                relations: {
                    turnir: true
                }
            })
            if (!tim.length) throw new NotFoundException("Tim sa datim id ne postoji")
            //if (!turnir.length) throw new NotFoundException("Moras uneti pravi turnir za ovaj tim")
            const noviTurnir: Turnir = new Turnir()
            noviTurnir.naziv = naziv
            noviTurnir.tip=tip
            noviTurnir.opis=opis
            noviTurnir.mesto = mesto
            noviTurnir.datum=new Date()
            noviTurnir.cenaUcesca=cenaUcesca
            noviTurnir.nagradniFond=nagradniFond
            noviTurnir.brojTimova=brojTimova
            noviTurnir.tim=tim
            noviTurnir.organizator=organizator


            await this.turnirRepository.save(noviTurnir)
            organizator.forEach(organizator => {
                organizator.turnir.push(noviTurnir);
            })
            tim.forEach(tim => {
                tim.turnir.push(noviTurnir)
            })
            await this.timRepository.save(tim)
            await this.organizatorRepository.save(organizator)
        }
        catch (err) {
            throw new Error(err)
        }
    }

    async update(id: number, turnirDTO: UpdateTurnirDto): Promise<Turnir> {
        try {
            let turnir = await this.turnirRepository.findOneBy({ id })
            if (!turnir) throw new NotFoundException("Turnir sa zadatim id ne postoji")
            turnir = {
                ...turnir,
                ...turnirDTO
            }
            return await this.turnirRepository.save(turnir)
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

            // u svakom turniru u njegovoj listi timova koje poseduje, filtriramo turnir koji brisemo
            for (const turnir of turnirTim) {
                turnir.tim = turnir.tim.filter(turnirTim => turnirTim.id !== id)
                await this.turnirRepository.save(turnir)
            }

            // // brisemo iz veze vise na vise, pa onda obrisemo knjigu
            await this.turnirRepository.delete({
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