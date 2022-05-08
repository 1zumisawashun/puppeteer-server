import express, { Request, Response, NextFunction } from 'express';
const app = express();

import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import listRoutes from './routes/listRoutes';
import authRoutes from './routes/authRoutes';
import automemoRoutes from './routes/automemoRoutes';
import meetingowlRoutes from './routes/meetingowlRoutes';
import { requestAuth, checkUser } from './middleware/authMiddleware';
import * as helpers from './helpers/helpers';

app.locals = helpers;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

app.use('/lists', checkUser, listRoutes);
app.use(authRoutes);
app.use('/api/automemo', automemoRoutes);
app.use('/api/meetingowl', meetingowlRoutes);

app.listen(3000);
console.log('これはテスト');

app.get('*', checkUser);
app.get('/', requestAuth, (req: Request, res: Response, next: NextFunction) => {
  res.redirect('/lists');
});
app.get('/about', (req: Request, res: Response, next: NextFunction) => {
  res.render('about', { title: 'About' });
});
app.get('/set-cookies', (req: Request, res: Response, next: NextFunction) => {
  res.cookie('newUser', false);
  res.cookie('isEmployee', true, {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  });
  res.send('you got a cookies');
});
app.get('/read-cookies', (req: Request, res: Response, next: NextFunction) => {
  const cookies = req.cookies;
  res.json(cookies);
});

export default app; // NOTE:vercelのセットアップ
