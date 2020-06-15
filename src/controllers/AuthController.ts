import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { User } from "../entity/User";
import config from "../config/config";
import cookieParser = require("cookie-parser");

class AuthController {
  static login = async (req: Request, res: Response) => {
    //Check if username_or_email and password are set
    let { username_or_email, password } = req.body;
    if (!(username_or_email && password)) {
      res.status(400).send();
    }

    //Get user from database
    const userRepository = getRepository(User);
    let user: User;
    user = await userRepository.createQueryBuilder()
    .where("username = :username OR email = :email", {
      username: username_or_email,
      email: username_or_email
    }).getOne();

    if (!user) {
      res.status(401).send({ status: 401, key: "invalid_account", message: 'Invalid account' });
      return;
    }

    //Check if encrypted password match
    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
      res.status(401).send({ status: 401, key: "invalid_login", message: 'incorrect password entered' });
      return;
    }

    //sign JWT, valid for 1 hour
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      config.jwtSecret,
      { expiresIn: "1h" }
    );

    // const cookieOptions = { httpOnly: true };
    const cookieOptions = {};

    //Send the jwt in the response
    res.status(200)
      .cookie('auth-token', token, cookieOptions)
      .send({ status: 200, authToken: token });
  };

  static changePassword = async (req: Request, res: Response) => {
    //Get ID from JWT
    const id = res.locals.jwtPayload.userId;

    //Get parameters from the body
    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
      res.status(400).send();
    }

    //Get user from the database
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (id) {
      res.status(401).send();
    }

    //Check if old password matchs
    if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
      res.status(401).send();
      return;
    }

    //Validate de model (password lenght)
    user.password = newPassword;
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    //Hash the new password and save
    user.hashPassword();
    userRepository.save(user);

    res.status(204).send();
  };
}
export default AuthController;
