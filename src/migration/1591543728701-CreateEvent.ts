import { MigrationInterface, QueryRunner, Table, TableIndex, TableForeignKey } from "typeorm";

export class CreateEvent1591543728701 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.createTable(new Table({
      name: "events",
      columns: [
        { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
        { name: "userId", type: "int" },
        { name: "name", type: "varchar" },
        { name: "eventDate", type: "varchar" },
        { name: "budget", type: "varchar" },
        { name: "items", type: "varchar" },
        { name: "description", type: "varchar" },
        { name: "location", type: "varchar" },
        { name: "active", type: "varchar" },
        { name: "createdAt", type: "timestamp" },
        { name: "updatedAt", type: "timestamp" }
      ]
    }), true);

    await queryRunner.createForeignKey("events", new TableForeignKey({
      columnNames: ["userId"],
      referencedColumnNames: ["id"],
      referencedTableName: "users"
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("events");
  }

}
