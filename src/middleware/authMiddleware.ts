import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { projectFiresore, documentId } from '../plugins/firebase';
import dotenv from 'dotenv';
dotenv.config();

export const requestAuth: RequestHandler = async (req, res, next) => {
  const token = req.cookies.jwt as string;
  if (token) {
    jwt.verify(token, process.env.JWT_PRIVATE_KEY!, (err, decodedToken) => {
      if (err) {
        res.redirect('/login');
      } else {
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
};

export const checkUser: RequestHandler = async (req, res, next) => {
  const token = req.cookies.jwt as string;
  if (token) {
    jwt.verify(
      token,
      process.env.JWT_PRIVATE_KEY!,
      async (err, decodedToken) => {
        if (err) {
          res.locals.user = null;
          next();
        } else {
          const querySnapshot = await projectFiresore
            .collection('users')
            .where(documentId, '==', (decodedToken as jwt.JwtPayload).id)
            .get();

          res.locals.user = querySnapshot.docs[0].data();
          next();
        }
      },
    );
  } else {
    res.locals.user = null;
    res.redirect('/login');
  }
};

export const getUserId = (token: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      process.env.JWT_PRIVATE_KEY!,
      async (err, decodedToken) => {
        if (err) {
          reject();
        } else {
          resolve((decodedToken as jwt.JwtPayload).id);
        }
      },
    );
  });
};
