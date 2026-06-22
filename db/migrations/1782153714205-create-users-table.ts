import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1782153714205 implements MigrationInterface {
  name = 'CreateUsersTable1782153714205';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying(50) NOT NULL, "email" character varying(200) NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"));
      
      CREATE UNIQUE INDEX "USER_UNIQUE_USERNAME_LOWER" ON "users" (LOWER("username"));
      
      CREATE UNIQUE INDEX "USER_UNIQUE_EMAIL_LOWER" ON "users" (LOWER("email"));`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE UNIQUE INDEX "USER_UNIQUE_EMAIL_LOWER" ON "users" (LOWER("email"));
      
      CREATE UNIQUE INDEX "USER_UNIQUE_USERNAME_LOWER" ON "users" (LOWER("username"));
      
      DROP TABLE "users";`);
  }
}
