const admin = require("../plugins/firebase");
const db = admin.firestore();
const bucket = admin.storage().bucket();
const { getUserId } = require("../middleware/authMiddleware");

const list_index = async (req, res) => {
  try {
    const querySnapshot = await db.collection("request").get();
    const lists = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    res.render("index", { title: "All Lists", lists });
  } catch (error) {
    res.status(404).render("404", { title: "List not Found" });
  }
};

const list_detail = async (req, res) => {
  try {
    const docSnapshot = await db.collection("request").doc(req.params.id).get();
    res.render("detail", {
      title: "Detail List",
      list: { id: docSnapshot.id, ...docSnapshot.data() },
    });
  } catch (error) {
    res.status(404).render("404", { title: "List not Found" });
  }
};

const list_create_get = (req, res) => {
  res.render("create", { title: "Create a new List" });
};

const getUrl = async (req, userId) => {
  const file = bucket.file(`thumbnail/${userId}/${req.file.originalname}`);
  await file.save(req.file.buffer);
  const url = await file.getSignedUrl({
    action: "read",
    expires: Date.now() + 24 * 60 * 60 * 365, // NOTE:1年に設定する
  });
  return url;
};

const list_create_post = async (req, res) => {
  const userId = await getUserId(req.cookies.jwt);
  const url = await getUrl(req, userId);
  const timeStamp = admin.firestore.FieldValue.serverTimestamp();
  try {
    const params = {
      user_id: userId,
      product_name: req.body.productName,
      shop_name_path: req.body.shopNamePath,
      product_price_path: req.body.productPricePath,
      url: req.body.url,
      thumbnail: url,
      remark: req.body.remark,
      timestamp: timeStamp,
    };
    const result = await db.collection("request").add(params);
    if (result) {
      res.redirect("/lists");
    }
  } catch (error) {
    res.status(404).render("404", { title: "List not Found" });
  }
};

const list_delete = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await db.collection("request").doc(id).delete();
    if (result) {
      res.json({ redirect: "/lists" });
    }
  } catch (error) {
    res.status(404).render("404", { title: "List not Found" });
  }
};

module.exports = {
  list_index,
  list_detail,
  list_create_get,
  list_create_post,
  list_delete,
};
