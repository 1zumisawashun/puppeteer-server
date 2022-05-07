import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { projectFiresore, admin } from '../plugins/firebase';

export const requestAuth: RequestHandler = async (req, res, next) => {
  const token = req.cookies.jwt as string;
  if (token) {
    jwt.verify(token, 'net ninja secret', (err, decodedToken) => {
      if (err) {
        res.redirect('/login');
      } else {
        console.log('JWT VERIFY', decodedToken);
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
    jwt.verify(token, 'net ninja secret', async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        await projectFiresore
          .collection('users')
          .where(
            admin.firestore.FieldPath.documentId(),
            '==',
            (decodedToken as jwt.JwtPayload).id,
          )
          .get()
          .then((docSnapshot) => {
            return docSnapshot.docs[0].data();
          })
          .then((user) => {
            res.locals.user = user;
            next();
          });
      }
    });
  } else {
    res.locals.user = null;
    res.redirect('/login');
  }
};

export const getUserId = (token: string) => {
  if (!token) return null;
  return jwt.verify(token, 'net ninja secret', async (err, decodedToken) => {
    if (err) {
      return;
    } else {
      return (decodedToken as jwt.JwtPayload).id;
    }
  });
};
