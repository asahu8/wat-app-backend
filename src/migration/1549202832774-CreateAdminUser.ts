import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { User } from "../entity/User";

export class CreateAdminUser1547919837483 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    let user = new User();

    user.username = 'admin';
    user.firstName = 'Sean';
    user.lastName =  'Alexander';
    user.role = 'Admin';
    user.email = 'salexander@watpp.com';
    user.dateOfBirth ="10-10-1990";
    user.phoneNumber = "9875-482-495";
    user.password = "admin@123";
    user.contributionAmount = 2000;
    user.livesUplifted = 5;
    user.fundsLives = 5;
    user.companyName = 'act corp';
    user.designation = "nodJS dev";
    user.location = 'SFO';
    user.areasOfInterest = "basket ball";
    user.active = true;
    user.isAdmin = true;
    user.role = 'ADMIN';

    user.hashPassword();
    const userRepository = getRepository(User);
    await userRepository.save(user);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
