import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPhoneToUsers1697049600000
  implements MigrationInterface
{
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE users
      ADD COLUMN phone VARCHAR(20)
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE users
      DROP COLUMN phone
    `);
  }
}
