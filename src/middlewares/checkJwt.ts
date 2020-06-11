import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/config";

var get_cookies = function(request) {
  var cookies = {};
  request.headers.cookie && request.headers.cookie.split(';').forEach(function(cookie) {
    var parts = cookie.match(/(.*?)=(.*)$/)
    cookies[ parts[1].trim() ] = (parts[2] || '').trim();
  });
  return cookies;
};

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  // Get the token from cookie
  let watCookie = req.headers["cookie"] as string;
  let tokenFromCookie;

  if(watCookie) {
    // tokenFromCookie = watCookie.split("=")[1]
  }
  tokenFromCookie = get_cookies(req)['auth-token'];

  //Get the jwt token from the head
  const token = <string>req.headers["auth"] || tokenFromCookie;
  let jwtPayload;

  //Try to validate the token and get data
  try {
    jwtPayload = <any>jwt.verify(token, config.jwtSecret);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
    res.status(401).send();
    return;
  }

  //The token is valid for 1 hour
  //We want to send a new token on every request
  console.log('jwtPaylad', jwtPayload);
  const { userId, username } = jwtPayload;
  req['userID']= userId;
  req['username']= username;
  req =  { ...req, ...username, ...userId }
  const newToken = jwt.sign({ userId, username }, config.jwtSecret, {
    expiresIn: "1h"
  });
  res.setHeader("auth-token", newToken);

  //Call the next middleware or controller
  next();
};
