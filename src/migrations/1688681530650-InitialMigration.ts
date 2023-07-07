import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1688681530650 implements MigrationInterface {
    name = 'InitialMigration1688681530650'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "menu" ("id" SERIAL NOT NULL, "establishId" uuid, CONSTRAINT "REL_60a03f6caac33966fdc4edba1f" UNIQUE ("establishId"), CONSTRAINT "PK_35b2a8f47d153ff7a41860cceeb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "menu_product_product" ("menuId" integer NOT NULL, "productId" integer NOT NULL, CONSTRAINT "PK_80cbc68b99d368e2e3fc6b80c14" PRIMARY KEY ("menuId", "productId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b38a92ff1bf62847aea0924e53" ON "menu_product_product" ("menuId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c802fb0003dbe7fc791126787a" ON "menu_product_product" ("productId") `);
        await queryRunner.query(`ALTER TABLE "menu" ADD CONSTRAINT "FK_60a03f6caac33966fdc4edba1fd" FOREIGN KEY ("establishId") REFERENCES "establish"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "menu_product_product" ADD CONSTRAINT "FK_b38a92ff1bf62847aea0924e538" FOREIGN KEY ("menuId") REFERENCES "menu"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "menu_product_product" ADD CONSTRAINT "FK_c802fb0003dbe7fc791126787a2" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "menu_product_product" DROP CONSTRAINT "FK_c802fb0003dbe7fc791126787a2"`);
        await queryRunner.query(`ALTER TABLE "menu_product_product" DROP CONSTRAINT "FK_b38a92ff1bf62847aea0924e538"`);
        await queryRunner.query(`ALTER TABLE "menu" DROP CONSTRAINT "FK_60a03f6caac33966fdc4edba1fd"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c802fb0003dbe7fc791126787a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b38a92ff1bf62847aea0924e53"`);
        await queryRunner.query(`DROP TABLE "menu_product_product"`);
        await queryRunner.query(`DROP TABLE "menu"`);
    }

}
