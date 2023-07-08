import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1688698567969 implements MigrationInterface {
    name = 'InitialMigration1688698567969'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "FK_37be2b25c8c126acb2f31f8105e"`);
        await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "adressesId"`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "clientId" uuid`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_ae1b6a2290ac79ac41dff9aa574" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_ae1b6a2290ac79ac41dff9aa574"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "clientId"`);
        await queryRunner.query(`ALTER TABLE "client" ADD "adressesId" uuid`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "FK_37be2b25c8c126acb2f31f8105e" FOREIGN KEY ("adressesId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
