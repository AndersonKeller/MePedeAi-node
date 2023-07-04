import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1688434793064 implements MigrationInterface {
    name = 'InitialMigration1688434793064'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "establish" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "establish" ADD "phone" character varying(12) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "establish" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "establish" ADD "phone" integer NOT NULL`);
    }

}
