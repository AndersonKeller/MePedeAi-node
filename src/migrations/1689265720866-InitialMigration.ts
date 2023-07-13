import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1689265720866 implements MigrationInterface {
    name = 'InitialMigration1689265720866'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "quantity"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "quantity" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "quantity"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "quantity" integer NOT NULL`);
    }

}
