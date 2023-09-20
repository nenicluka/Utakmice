import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Igrac } from 'src/entities/igrac.entity';
import { Tim } from 'src/entities/tim.entity';
import { Turnir } from 'src/entities/turnir.entity';
import { In, Not, Repository, TreeLevelColumn } from 'typeorm';
import { CreateTurnirDto, DodajTimNaTurnirDto, UpdateTurnirDto } from './DTOs';
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
            await this.turnirRepository.save(noviTurnir)
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
            const turnir = await this.turnirRepository.findOne({
                where: {
                    id
                },
                relations: {
                    organizator:
                    {
                        turnir:true
                    },
                    tim:
                    {
                        turnir:true
                    }
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
                        id: true
                    },
                    tim: {
                        id: true,
                        turnir:true
                    }
                }
            })
            if (!turnir) throw new NotFoundException("Turnir sa datim id ne postoji")

            const organizatori: Organizator[] = turnir.organizator

            
            for (const organizator of organizatori) {
                organizator.turnir = organizator.turnir.filter((turnir: Turnir) => turnir.id !== id)
                await this.organizatorRepository.save(organizator)
            }

            const timovi: Tim[] = turnir.tim

            
            for (const tim of timovi) {
                tim.turnir = tim.turnir.filter((turnir: Turnir) => turnir.id !== id)
                await this.timRepository.save(tim)
            }



            return await this.turnirRepository.delete(id)
        }
        catch (err) {
            console.log(err)
        }
    }


    async dodajTimNaTurnir(turnir: DodajTimNaTurnirDto) {
        try {
            const {id, timoviIDS} = turnir
            const tim: Tim[] = await this.timRepository.find({
                where: {
                    id: In(timoviIDS)
                },
                relations: {
                    turnir: true
                }
            })

            if (!tim.length) throw new NotFoundException("Tim sa datim id ne postoji")

            const noviTurnir = await this.turnirRepository.findOne({
                where: {
                    id
                },
                relations: {
                    organizator:
                    {
                        turnir:true
                    },
                    tim:
                    {
                        turnir:true
                    }
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
                        id: true
                    },
                    tim: {
                        id: true,
                        turnir:true
                    }
                }
            })



            noviTurnir.tim=tim


            await this.turnirRepository.save(noviTurnir)
 
            tim.forEach(tim => {
                tim.turnir.push(noviTurnir)
            })
            await this.timRepository.save(tim)
            await this.turnirRepository.save(noviTurnir)

        }
        catch (err) {
            throw new Error(err)
        }
    }
}