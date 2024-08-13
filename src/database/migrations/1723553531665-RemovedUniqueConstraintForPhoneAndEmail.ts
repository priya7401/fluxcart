import { MigrationInterface, QueryRunner } from "typeorm";

export class RemovedUniqueConstraintForPhoneAndEmail1723553531665 implements MigrationInterface {
    name = 'RemovedUniqueConstraintForPhoneAndEmail1723553531665'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" DROP CONSTRAINT "UQ_4e47a45a83eaebee77a193b5b7e"`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP CONSTRAINT "UQ_752866c5247ddd34fd05559537d"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" ADD CONSTRAINT "UQ_752866c5247ddd34fd05559537d" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD CONSTRAINT "UQ_4e47a45a83eaebee77a193b5b7e" UNIQUE ("phoneNumber")`);
    }

}
