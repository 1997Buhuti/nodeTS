import { MigrationInterface, QueryRunner } from "typeorm";

export class UserChange1683827578250 implements MigrationInterface {
    name = 'UserChange1683827578250'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "enrolledCourses" text NOT NULL, "Name" character varying(500) NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4d930ff23ef9f3696718a273d5" ON "user" ("Name") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_4d930ff23ef9f3696718a273d5"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
