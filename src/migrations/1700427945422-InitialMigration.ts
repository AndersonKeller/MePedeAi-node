import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1700427945422 implements MigrationInterface {
    name = 'InitialMigration1700427945422'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "UQ_6436cc6b79593760b9ef921ef12"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "UQ_6436cc6b79593760b9ef921ef12" UNIQUE ("email")`);
    }

}
