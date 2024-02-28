import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1709162247733 implements MigrationInterface {
    name = 'InitialMigration1709162247733'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."order_payment_enum" AS ENUM('dinheiro', 'crédito', 'débito', 'pix')`);
        await queryRunner.query(`ALTER TABLE "order" ADD "payment" "public"."order_payment_enum" NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "payment"`);
        await queryRunner.query(`DROP TYPE "public"."order_payment_enum"`);
    }

}
