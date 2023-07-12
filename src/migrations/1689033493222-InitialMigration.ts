import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1689033493222 implements MigrationInterface {
    name = 'InitialMigration1689033493222'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "price" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD "total" double precision NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."order_order_type_enum" AS ENUM('delivery', 'take', 'salloon')`);
        await queryRunner.query(`ALTER TABLE "order" ADD "order_type" "public"."order_order_type_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD "clientId" uuid`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "UQ_9b27855a9c2ade186e5c55d1ec3" UNIQUE ("clientId")`);
        await queryRunner.query(`ALTER TABLE "order" ADD "establishId" uuid`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "UQ_414096f7ebf68294f45fec4beac" UNIQUE ("establishId")`);
        await queryRunner.query(`ALTER TABLE "order" ADD "addressId" uuid`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "UQ_73f9a47e41912876446d047d015" UNIQUE ("addressId")`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_9b27855a9c2ade186e5c55d1ec3" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_414096f7ebf68294f45fec4beac" FOREIGN KEY ("establishId") REFERENCES "establish"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_73f9a47e41912876446d047d015" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_73f9a47e41912876446d047d015"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_414096f7ebf68294f45fec4beac"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_9b27855a9c2ade186e5c55d1ec3"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "UQ_73f9a47e41912876446d047d015"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "addressId"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "UQ_414096f7ebf68294f45fec4beac"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "establishId"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "UQ_9b27855a9c2ade186e5c55d1ec3"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "clientId"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "order_type"`);
        await queryRunner.query(`DROP TYPE "public"."order_order_type_enum"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "total"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "name" character varying NOT NULL`);
    }

}
