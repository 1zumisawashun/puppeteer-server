import { RequestHandler, Request } from 'express';
import {
  projectFiresore,
  projectStorage,
  serverTimestamp,
} from '../plugins/firebase';
import { getUserId } from '../middleware/authMiddleware';

interface Req {
  user_id: string;
  product_name: string;
  shop_name_path: string;
  product_price_path: string;
  url: string;
  thumbnail: Array<string>;
  remark: string;
  timestamp: typeof serverTimestamp;
}

export const list_index: RequestHandler = async (req, res, next) => {
  try {
    const querySnapshot = await projectFiresore.collection('request').get();
    const lists = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...(doc.data() as Req) };
    });
    res.render('index', { title: 'All Lists', lists });
  } catch (error) {
    res.status(404).render('404', { title: 'List not Found' });
  }
};

export const list_detail: RequestHandler = async (req, res, next) => {
  try {
    const docSnapshot = await projectFiresore
      .collection('request')
      .doc(req.params.id)
      .get();
    res.render('detail', {
      title: 'Detail List',
      list: { id: docSnapshot.id, ...(docSnapshot.data() as Req) },
    });
  } catch (error) {
    res.status(404).render('404', { title: 'List not Found' });
  }
};

export const list_create_get: RequestHandler = async (req, res, next) => {
  res.render('create', { title: 'Create a new List' });
};

export const getUrl = async (req: Request, userId: string) => {
  const file = projectStorage
    .bucket()
    .file(
      `thumbnail/${userId}/${(req.file as Express.Multer.File).originalname}`,
    );
  await file.save((req.file as Express.Multer.File).buffer);
  const url = await file.getSignedUrl({
    action: 'read',
    expires: Date.now() + 24 * 60 * 60 * 365, // NOTE:1年に設定する
  });
  return url;
};

export const list_create_post: RequestHandler = async (req, res, next) => {
  const userId = await getUserId(req.cookies.jwt);
  const url = await getUrl(req, userId);
  try {
    const params = {
      user_id: userId,
      product_name: req.body.productName,
      shop_name_path: req.body.shopNamePath,
      product_price_path: req.body.productPricePath,
      url: req.body.url,
      thumbnail: url,
      remark: req.body.remark,
      timestamp: serverTimestamp,
    };
    const result = await projectFiresore.collection('request').add(params);
    if (result) {
      res.redirect('/lists');
    }
  } catch (error) {
    res.status(404).render('404', { title: 'List not Found' });
  }
};

export const list_delete: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await projectFiresore.collection('request').doc(id).delete();
    if (result) {
      res.json({ redirect: '/lists' });
    }
  } catch (error) {
    res.status(404).render('404', { title: 'List not Found' });
  }
};
