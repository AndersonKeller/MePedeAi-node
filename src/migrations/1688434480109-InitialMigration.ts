import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1688434480109 implements MigrationInterface {
    name = 'InitialMigration1688434480109'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "establish" ADD "phone" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "establish" DROP COLUMN "phone"`);
    }

}
