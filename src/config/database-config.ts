import { TypeOrmModule } from "@nestjs/typeorm";

export const databaseConfig = [

    TypeOrmModule.forRoot({
        "type": "mssql",
        "host": "localhost",
        "port": 1433,
        "username": "SA",
        "password": "reallyStrongPwd123",
        "database": "token",
        "entities": [
            "dist/**/*.entity{.ts,.js}"
        ],
        "synchronize": true,
        options: {
            trustServerCertificate: true,
        }
    },)

]