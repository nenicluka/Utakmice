import { Igrac } from "src/entities/igrac.entity";
import { Moderator } from "src/entities/moderator.entity";
import { Organizator } from "src/entities/organizator.entity";
import { Prijava } from "src/entities/prijava.entity";
import { Tim } from "src/entities/tim.entity";
import { Turnir } from "src/entities/turnir.entity";
import { User } from "src/entities/user.entity";
import { DataSourceOptions } from "typeorm";

export const typeOrmConfig: DataSourceOptions = {
    type: "postgres",
    host: 'localhost',
    port: 5434,
    username: "postgres",
    password: "123",
    logging: true,
    entities: [User, Igrac, Moderator, Organizator, Tim, Turnir, Prijava],
    synchronize: true,
    database: "utakmice",

    
}

