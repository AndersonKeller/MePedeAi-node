import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1689103423580 implements MigrationInterface {
    name = 'InitialMigration1689103423580'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_b3fc90381815c6288d7356df067"`);
        await queryRunner.query(`ALTER TABLE "order" RENAME COLUMN "productsId" TO "products"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "products"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "products" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "products"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "products" integer`);
        await queryRunner.query(`ALTER TABLE "order" RENAME COLUMN "products" TO "productsId"`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_b3fc90381815c6288d7356df067" FOREIGN KEY ("productsId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
