const admin = require("firebase-admin");
const ServiceAccount = require("../ServiceAccount.json");
if (admin.apps.length === 0) {
  admin.initializeApp({ credential: admin.credential.cert(ServiceAccount) });
}
const db = admin.firestore();
const docRef = db.collection("users").doc("alovelace");
const setAda = docRef.set({
  first: "Ada",
  last: "Lovelace",
  born: 1815,
});
// const multer = require("multer");
// const upload = multer();

const list_index = (req, res) => {
  db.collection("request")
    .get()
    .then((querySnapshot) => {
      const lists = [];
      querySnapshot.forEach((doc) => {
        lists.push({ id: doc.id, ...doc.data() });
      });
      res.render("index", { title: "All Lists", lists: lists });
      //res.json(blogs); jsonで画面描画される
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
const list_create_post = (req, res) => {
  db.collection("request")
    .add({
      product_name: req.body.productName,
      shop_name_path: req.body.shopNamePath,
      product_price_path: req.body.productPricePath,
      url: req.body.url,
      remark: req.body.remark,
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
