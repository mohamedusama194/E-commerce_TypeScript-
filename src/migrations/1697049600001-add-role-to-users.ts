import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoleToUsers1697049600001 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE users
      ADD COLUMN role VARCHAR(20) DEFAULT 'user'
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE users
      DROP COLUMN role
    `);
  }
}
