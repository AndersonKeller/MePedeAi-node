import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1689265508764 implements MigrationInterface {
    name = 'InitialMigration1689265508764'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" ADD "quantity" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "quantity"`);
    }

}
