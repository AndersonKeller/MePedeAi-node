import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1688597942354 implements MigrationInterface {
    name = 'InitialMigration1688597942354'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "type_product" ("id" SERIAL NOT NULL, "name" character varying(45) NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_0cc94b0fa67e1d060b037e0b1f4" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "type_product"`);
    }

}
