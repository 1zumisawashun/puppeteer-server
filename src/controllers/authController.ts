import { RequestHandler } from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { check, validationResult, ValidationError } from 'express-validator';
import { projectFiresore } from '../plugins/firebase';

interface NewErrors {
  password?: string;
  email?: string;
}

// create token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id: any) => {
  return jwt.sign({ id }, 'net ninja secret', {
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
  res.cookie('jwt', '', { maxAge: 1 });
  //expire quickly because maxAge is 1
  res.redirect('/');
};

export const login_post: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;
  await projectFiresore
    .collection('users')
    .where('email', '==', email)
    .get()
    .then((docSnapshot) => {
      const user: Array<any> = [];
      docSnapshot.forEach((doc) => {
        user.push({ id: doc.id, ...doc.data() });
      });
      return user[0];
    })
    .then(async (user) => {
      console.log(user);
      const newErrors: NewErrors = {};
      if (user) {
        const auth = await bcrypt.compare(password, user.hashPassword);
        if (auth) {
          console.log(auth, 'authはあります！');
          const token = await createToken(user.id);
          res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1800 });
          return res.status(201).json({ user: user.id });
          //pass with data to login.ejs
        }
        newErrors.password = 'inncorect password!';
        return res.status(422).json(newErrors);
        //already linked to login.ejs
      }
      newErrors.email = 'inncorect login id';
      return res.status(422).json(newErrors);
    });
};

export const signup_post: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;
  //validation here
  const result = validationResult(req);
  if (!result.isEmpty()) {
    // failed!
    const newErrors: NewErrors = {};
    result.array().forEach((err: ValidationError) => {
      if (err.param.includes('email')) {
        newErrors.email = 'Please enter a valid email';
      } else if (err.param.includes('password')) {
        newErrors.password = 'Minimum password length is a 6 characters';
      }
    });
    return res.status(422).json(newErrors);
    //this data send to signup.ejs and possible to get res.json()
  }
  //bcript here
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  //firestore here
  await projectFiresore
    .collection('users')
    .add({
      email,
      hashPassword,
    })
    .then(async (result) => {
      const token = await createToken(result.id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1800 });
      res.status(201).json({ user: result.id });
      //this data send to signup.ejs and possible to get res.json()
    });
};
