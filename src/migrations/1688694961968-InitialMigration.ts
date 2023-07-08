import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1688694961968 implements MigrationInterface {
    name = 'InitialMigration1688694961968'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."addresses_state_enum" AS ENUM('RS')`);
        await queryRunner.query(`CREATE TABLE "addresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "street" character varying(64) NOT NULL, "city" character varying NOT NULL, "state" "public"."addresses_state_enum" NOT NULL, "zipcode" character varying(9) NOT NULL, "number" character varying(25) NOT NULL, "reference" character varying, CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "client" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(45) NOT NULL, "phone" character varying(12) NOT NULL, "email" character varying(45) NOT NULL, "password" character varying(120) NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), "deletedAt" date, "adressesId" uuid, CONSTRAINT "UQ_6436cc6b79593760b9ef921ef12" UNIQUE ("email"), CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "FK_37be2b25c8c126acb2f31f8105e" FOREIGN KEY ("adressesId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "FK_37be2b25c8c126acb2f31f8105e"`);
        await queryRunner.query(`DROP TABLE "client"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
        await queryRunner.query(`DROP TYPE "public"."addresses_state_enum"`);
    }

}
