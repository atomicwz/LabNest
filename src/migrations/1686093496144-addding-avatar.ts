import { MigrationInterface, QueryRunner } from 'typeorm';

export class adddingAvatar1686093496144 implements MigrationInterface {
  name = 'adddingAvatar1686093496144';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "avatar" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "isAdmin" SET DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "isAdmin" DROP DEFAULT`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "avatar"`);
  }
}
