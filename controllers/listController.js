const admin = require("../plugins/firebase");
const db = admin.firestore();
const bucket = admin.storage().bucket();
const { getUserId } = require("../middleware/authMiddleware");

const list_index = (req, res) => {
  db.collection("request")
    .get()
    .then((querySnapshot) => {
      const lists = [];
      querySnapshot.forEach((doc) => {
        lists.push({ id: doc.id, ...doc.data() });
      });
      res.render("index", { title: "All Lists", lists: lists });
    })
    .catch((error) => {
      console.log(error);
      res.status(404).render("404", { title: "List not Found" });
    });
};

const list_detail = (req, res) => {
  db.collection("request")
    .doc(req.params.id)
    .get()
    .then((docSnapshot) => {
      const list = [];
      list.push({ id: docSnapshot.id, ...docSnapshot.data() });
      res.render("detail", { title: "Detail List", list: list[0] });
    })
    .catch((error) => {
      console.log(error);
      res.status(404).render("404", { title: "List not Found" });
    });
};

const list_create_get = (req, res) => {
  res.render("create", { title: "Create a new List" });
};

const list_create_post = async (req, res) => {
  const token = req.cookies.jwt;
  const userId = await getUserId(token);
  console.log(userId, "userId");
  console.log(req.file, "req.file");
  // FIXME:timeStampが[object : object]になるstrにする必要あり
  // FIXME:storageRefを作成し格納する
  const timeStamp = admin.firestore.FieldValue.serverTimestamp();
  // MEMO:firebase consoleから覗いたときのパスを指定する
  const file = bucket.file(
    `thumbnail/${userId}/${timeStamp}/${req.file.originalname}`
  );
  console.log(file, "maybe file reference");
  try {
    // MEMO:hogeはアップロードしたいファイル
    await file.save(req.file.buffer);
    // MEMO:contentTypeは別でセットしないとダメ
    await file.setMetadata({ contentType: req.file.mimetype });
  } catch (err) {
    console.log(err);
  }
  db.collection("request")
    .add({
      user_id: userId,
      product_name: req.body.productName,
      shop_name_path: req.body.shopNamePath,
      product_price_path: req.body.productPricePath,
      url: req.body.url,
      remark: req.body.remark,
      time_stamp: timeStamp,
    })
    .then((result) => {
      res.redirect("/Lists");
    })
    .catch((error) => {
      console.log(error);
      res.status(404).render("404", { title: "List not Found" });
    });
};

const list_delete = (req, res) => {
  const id = req.params.id;
  db.collection("request")
    .doc(id)
    .delete()
    .then((result) => {
      res.json({ redirect: "/lists" });
    })
    .catch((error) => {
      console.log(error);
      res.status(404).render("404", { title: "List not Found" });
    });
};

module.exports = {
  list_index,
  list_detail,
  list_create_get,
  list_create_post,
  list_delete,
};
