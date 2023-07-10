import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1688950968897 implements MigrationInterface {
    name = 'InitialMigration1688950968897'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."addresses_state_enum" AS ENUM('RS')`);
        await queryRunner.query(`CREATE TABLE "addresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "street" character varying(64) NOT NULL, "city" character varying NOT NULL, "state" "public"."addresses_state_enum" NOT NULL, "zipcode" character varying(9) NOT NULL, "number" character varying(25) NOT NULL, "reference" character varying, CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "establish" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(45) NOT NULL, "email" character varying(45) NOT NULL, "phone" character varying(12) NOT NULL, "admin" boolean NOT NULL DEFAULT true, "password" character varying(120) NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), "deletedAt" date, CONSTRAINT "UQ_4f43a340ba24ccb45101c1c4ace" UNIQUE ("email"), CONSTRAINT "PK_b39ed6ba2d0a186ca3f6b2d077c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "client" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(45) NOT NULL, "phone" character varying(12) NOT NULL, "email" character varying(45) NOT NULL, "password" character varying(120) NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), "deletedAt" date, "addressId" uuid, "establishId" uuid, CONSTRAINT "UQ_6436cc6b79593760b9ef921ef12" UNIQUE ("email"), CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "type_product" ("id" SERIAL NOT NULL, "name" character varying(45) NOT NULL, "description" character varying NOT NULL, "establishId" uuid, CONSTRAINT "PK_0cc94b0fa67e1d060b037e0b1f4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" character varying(45) NOT NULL, "description" character varying NOT NULL, "typeId" integer, "establishId" uuid, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "menu" ("id" SERIAL NOT NULL, "establishId" uuid, CONSTRAINT "REL_60a03f6caac33966fdc4edba1f" UNIQUE ("establishId"), CONSTRAINT "PK_35b2a8f47d153ff7a41860cceeb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "menu_product_product" ("menuId" integer NOT NULL, "productId" integer NOT NULL, CONSTRAINT "PK_80cbc68b99d368e2e3fc6b80c14" PRIMARY KEY ("menuId", "productId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b38a92ff1bf62847aea0924e53" ON "menu_product_product" ("menuId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c802fb0003dbe7fc791126787a" ON "menu_product_product" ("productId") `);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "FK_6e6c7c79fbf5ab39520cd1723e2" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "FK_23d5317454c9f972a055a677eab" FOREIGN KEY ("establishId") REFERENCES "establish"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "type_product" ADD CONSTRAINT "FK_3de90b457cc1dc79011310f1ec9" FOREIGN KEY ("establishId") REFERENCES "establish"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_53bafe3ecc25867776c07c9e666" FOREIGN KEY ("typeId") REFERENCES "type_product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_6340647dfa244506e4d0035f07a" FOREIGN KEY ("establishId") REFERENCES "establish"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "menu" ADD CONSTRAINT "FK_60a03f6caac33966fdc4edba1fd" FOREIGN KEY ("establishId") REFERENCES "establish"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "menu_product_product" ADD CONSTRAINT "FK_b38a92ff1bf62847aea0924e538" FOREIGN KEY ("menuId") REFERENCES "menu"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "menu_product_product" ADD CONSTRAINT "FK_c802fb0003dbe7fc791126787a2" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "menu_product_product" DROP CONSTRAINT "FK_c802fb0003dbe7fc791126787a2"`);
        await queryRunner.query(`ALTER TABLE "menu_product_product" DROP CONSTRAINT "FK_b38a92ff1bf62847aea0924e538"`);
        await queryRunner.query(`ALTER TABLE "menu" DROP CONSTRAINT "FK_60a03f6caac33966fdc4edba1fd"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_6340647dfa244506e4d0035f07a"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_53bafe3ecc25867776c07c9e666"`);
        await queryRunner.query(`ALTER TABLE "type_product" DROP CONSTRAINT "FK_3de90b457cc1dc79011310f1ec9"`);
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "FK_23d5317454c9f972a055a677eab"`);
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "FK_6e6c7c79fbf5ab39520cd1723e2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c802fb0003dbe7fc791126787a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b38a92ff1bf62847aea0924e53"`);
        await queryRunner.query(`DROP TABLE "menu_product_product"`);
        await queryRunner.query(`DROP TABLE "menu"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "type_product"`);
        await queryRunner.query(`DROP TABLE "client"`);
        await queryRunner.query(`DROP TABLE "establish"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
        await queryRunner.query(`DROP TYPE "public"."addresses_state_enum"`);
    }

}
