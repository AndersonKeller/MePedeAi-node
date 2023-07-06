import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1688599116155 implements MigrationInterface {
    name = 'InitialMigration1688599116155'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "type_product" ADD "establishId" uuid`);
        await queryRunner.query(`ALTER TABLE "type_product" ADD CONSTRAINT "FK_3de90b457cc1dc79011310f1ec9" FOREIGN KEY ("establishId") REFERENCES "establish"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "type_product" DROP CONSTRAINT "FK_3de90b457cc1dc79011310f1ec9"`);
        await queryRunner.query(`ALTER TABLE "type_product" DROP COLUMN "establishId"`);
    }

}
