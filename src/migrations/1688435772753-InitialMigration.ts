import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1688435772753 implements MigrationInterface {
    name = 'InitialMigration1688435772753'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "establish" DROP CONSTRAINT "PK_b39ed6ba2d0a186ca3f6b2d077c"`);
        await queryRunner.query(`ALTER TABLE "establish" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "establish" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "establish" ADD CONSTRAINT "PK_b39ed6ba2d0a186ca3f6b2d077c" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "establish" DROP CONSTRAINT "PK_b39ed6ba2d0a186ca3f6b2d077c"`);
        await queryRunner.query(`ALTER TABLE "establish" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "establish" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "establish" ADD CONSTRAINT "PK_b39ed6ba2d0a186ca3f6b2d077c" PRIMARY KEY ("id")`);
    }

}
