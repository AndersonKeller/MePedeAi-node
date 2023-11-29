import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1701214166848 implements MigrationInterface {
    name = 'InitialMigration1701214166848'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "shop" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying(52) NOT NULL, "establishId" uuid, CONSTRAINT "REL_c2b47034a57da18175710084e6" UNIQUE ("establishId"), CONSTRAINT "PK_ad47b7c6121fe31cb4b05438e44" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "shop" ADD CONSTRAINT "FK_c2b47034a57da18175710084e61" FOREIGN KEY ("establishId") REFERENCES "establish"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shop" DROP CONSTRAINT "FK_c2b47034a57da18175710084e61"`);
        await queryRunner.query(`DROP TABLE "shop"`);
    }

}
