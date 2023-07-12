import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1689033676076 implements MigrationInterface {
    name = 'InitialMigration1689033676076'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" ADD "menuId" integer`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "UQ_4f59acacbd2a6e861012a54c0ff" UNIQUE ("menuId")`);
        await queryRunner.query(`ALTER TABLE "order" ADD "productsId" integer`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_4f59acacbd2a6e861012a54c0ff" FOREIGN KEY ("menuId") REFERENCES "menu"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_b3fc90381815c6288d7356df067" FOREIGN KEY ("productsId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_b3fc90381815c6288d7356df067"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_4f59acacbd2a6e861012a54c0ff"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "productsId"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "UQ_4f59acacbd2a6e861012a54c0ff"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "menuId"`);
    }

}
