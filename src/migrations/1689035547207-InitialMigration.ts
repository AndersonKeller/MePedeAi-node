import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1689035547207 implements MigrationInterface {
    name = 'InitialMigration1689035547207'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_414096f7ebf68294f45fec4beac"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_73f9a47e41912876446d047d015"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_4f59acacbd2a6e861012a54c0ff"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "UQ_414096f7ebf68294f45fec4beac"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "UQ_73f9a47e41912876446d047d015"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "UQ_4f59acacbd2a6e861012a54c0ff"`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_414096f7ebf68294f45fec4beac" FOREIGN KEY ("establishId") REFERENCES "establish"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_73f9a47e41912876446d047d015" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_4f59acacbd2a6e861012a54c0ff" FOREIGN KEY ("menuId") REFERENCES "menu"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_4f59acacbd2a6e861012a54c0ff"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_73f9a47e41912876446d047d015"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_414096f7ebf68294f45fec4beac"`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "UQ_4f59acacbd2a6e861012a54c0ff" UNIQUE ("menuId")`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "UQ_73f9a47e41912876446d047d015" UNIQUE ("addressId")`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "UQ_414096f7ebf68294f45fec4beac" UNIQUE ("establishId")`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_4f59acacbd2a6e861012a54c0ff" FOREIGN KEY ("menuId") REFERENCES "menu"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_73f9a47e41912876446d047d015" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_414096f7ebf68294f45fec4beac" FOREIGN KEY ("establishId") REFERENCES "establish"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
