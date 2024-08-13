import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedNewContactsTable1723549588492 implements MigrationInterface {
    name = 'AddedNewContactsTable1723549588492'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."contacts_linkprecedence_enum" AS ENUM('primary', 'secondary')`);
        await queryRunner.query(`CREATE TABLE "contacts" ("id" SERIAL NOT NULL, "phoneNumber" character varying, "email" character varying, "linkedId" integer, "linkPrecedence" "public"."contacts_linkprecedence_enum" NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_4e47a45a83eaebee77a193b5b7e" UNIQUE ("phoneNumber"), CONSTRAINT "UQ_752866c5247ddd34fd05559537d" UNIQUE ("email"), CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "contacts"`);
        await queryRunner.query(`DROP TYPE "public"."contacts_linkprecedence_enum"`);
    }

}
