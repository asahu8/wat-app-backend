import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { EventSeed } from "./seeds/EventSeed";

export class SeedEvents1591546014728 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    const data = await getRepository("events").save(EventSeed);
    console.log(data);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
