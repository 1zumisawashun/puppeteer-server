const firebase = require("../plugins/firebase");
const db = firebase.firestore();

const blog_index = (req, res) => {
  db.collection("request")
    .get()
    .then((querySnapshot) => {
      const blogs = [];
      querySnapshot.forEach((doc) => {
        blogs.push({ id: doc.id, ...doc.data() });
      });
      res.render("index", { title: "All Blogs", blogs: blogs });
      //res.json(blogs);
      // jsonで画面描画される
    })
    .catch((error) => {
      console.log(error);
      res.status(404).render("404", { title: "Blog not Found" });
    });
};
const blog_detail = (req, res) => {
  db.collection("request")
    .doc(req.params.id)
    .get()
    .then((docSnapshot) => {
      const blog = [];
      blog.push({ id: docSnapshot.id, ...docSnapshot.data() });
      res.render("detail", { title: "Detail Blog", blog: blog[0] });
    })
    .catch((error) => {
      console.log(error);
      res.status(404).render("404", { title: "Blog not Found" });
    });
};
const blog_create_get = (req, res) => {
  res.render("create", { title: "Create a new Blog" });
};
const blog_create_post = (req, res) => {
  db.collection("request")
    .add({
      title: req.body.title,
      snippet: req.body.snippet,
      body: req.body.body,
    })
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((error) => {
      console.log(error);
      res.status(404).render("404", { title: "Blog not Found" });
    });
};
const blog_delete = (req, res) => {
  const id = req.params.id;
  db.collection("request")
    .doc(id)
    .delete()
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((error) => {
      console.log(error);
      res.status(404).render("404", { title: "Blog not Found" });
    });
};

module.exports = {
  blog_index,
  blog_detail,
  blog_create_get,
  blog_create_post,
  blog_delete,
};
