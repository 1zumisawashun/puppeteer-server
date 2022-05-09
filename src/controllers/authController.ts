import { RequestHandler } from 'express';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { check, validationResult, ValidationError } from 'express-validator';
import { projectFiresore } from '../plugins/firebase';
import dotenv from 'dotenv';
dotenv.config();

interface NewErrors {
  password?: string;
  email?: string;
}

interface User {
  email: string;
  hashPassword: string;
}

// create token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id: any) => {
  return jwt.sign({ id }, process.env.JWT_PRIVATE_KEY!, {
    expiresIn: maxAge,
  });
};

export const signup_get: RequestHandler = async (req, res, next) => {
  res.render('signup', { title: 'signup' });
};
export const login_get: RequestHandler = async (req, res, next) => {
  res.render('login', { title: 'login' });
};
export const logout_get: RequestHandler = async (req, res, next) => {
  res.cookie('jwt', '', { maxAge: 1 }); // expire quickly because maxAge is 1
  res.redirect('/');
};

export const login_post: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;
  // NOTE:Firestore
  const querySnapshot = await projectFiresore
    .collection('users')
    .where('email', '==', email)
    .get();
  const result = querySnapshot.docs.map((doc) => {
    return { id: doc.id, ...(doc.data() as User) };
  });
  const user = result[0];
  // NOTE:Validation
  const newErrors: NewErrors = {};
  if (user) {
    const auth = await bcrypt.compare(password, user.hashPassword);
    if (auth) {
      const token = createToken(user.id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1800 });
      return res.status(201).json({ user: user.id });
    }
    newErrors.password = 'inncorect password!';
    return res.status(422).json(newErrors);
  }
  newErrors.email = 'inncorect login id';
  return res.status(422).json(newErrors);
};

export const signup_post: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;
  const result = validationResult(req);
  // NOTE:Validation
  if (!result.isEmpty()) {
    const newErrors: NewErrors = {};
    result.array().forEach((err: ValidationError) => {
      if (err.param.includes('email')) {
        newErrors.email = 'Please enter a valid email';
      } else if (err.param.includes('password')) {
        newErrors.password = 'Minimum password length is a 6 characters';
      }
    });
    return res.status(422).json(newErrors);
  }
  // NOTE:Bcript
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  // NOTE:Firestore
  const userDocRef = await projectFiresore.collection('users').add({
    email,
    hashPassword,
  });
  const token = createToken(userDocRef.id);
  res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1800 });
  res.status(201).json({ user: userDocRef.id });
};
