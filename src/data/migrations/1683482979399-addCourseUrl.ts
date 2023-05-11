import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCourseUrl1683482979399 implements MigrationInterface {
    name = 'AddCourseUrl1683482979399'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "COURSES" ADD "url" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "COURSES" DROP COLUMN "url"`);
    }

}
