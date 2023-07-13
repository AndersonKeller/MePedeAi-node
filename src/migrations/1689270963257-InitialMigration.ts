import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1689270963257 implements MigrationInterface {
    name = 'InitialMigration1689270963257'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "quantity" SET DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "quantity" DROP DEFAULT`);
    }

}
