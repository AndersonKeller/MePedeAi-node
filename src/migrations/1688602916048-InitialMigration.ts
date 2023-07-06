import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1688602916048 implements MigrationInterface {
    name = 'InitialMigration1688602916048'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" character varying(45) NOT NULL, "description" character varying NOT NULL, "typeId" integer, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_53bafe3ecc25867776c07c9e666" FOREIGN KEY ("typeId") REFERENCES "type_product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_53bafe3ecc25867776c07c9e666"`);
        await queryRunner.query(`DROP TABLE "product"`);
    }

}
