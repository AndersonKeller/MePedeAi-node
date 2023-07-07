import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1688682598366 implements MigrationInterface {
    name = 'InitialMigration1688682598366'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "establishId" uuid`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_6340647dfa244506e4d0035f07a" FOREIGN KEY ("establishId") REFERENCES "establish"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_6340647dfa244506e4d0035f07a"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "establishId"`);
    }

}
