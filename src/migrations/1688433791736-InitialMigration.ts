import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1688433791736 implements MigrationInterface {
    name = 'InitialMigration1688433791736'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "establish" ("id" SERIAL NOT NULL, "name" character varying(45) NOT NULL, "email" character varying(45) NOT NULL, "admin" boolean NOT NULL DEFAULT true, "password" character varying(120) NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), "deletedAt" date, CONSTRAINT "UQ_4f43a340ba24ccb45101c1c4ace" UNIQUE ("email"), CONSTRAINT "PK_b39ed6ba2d0a186ca3f6b2d077c" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "establish"`);
    }

}
