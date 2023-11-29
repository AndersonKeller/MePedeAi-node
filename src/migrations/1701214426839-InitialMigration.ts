import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1701214426839 implements MigrationInterface {
    name = 'InitialMigration1701214426839'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shop" ADD CONSTRAINT "UQ_03267e1dc1190dcbf796fc73fed" UNIQUE ("url")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shop" DROP CONSTRAINT "UQ_03267e1dc1190dcbf796fc73fed"`);
    }

}
