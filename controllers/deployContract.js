const path = require("path");

const { deploy } = require("../run");

exports.getDeploy = (req, res, next) => {
  console.log("Im in deploy script");
  res.sendFile(path.join(__dirname, "..", "views", "deploy.html"));
};

exports.postDeploy = (req, res, next) => {
  const value = { value: req.body.amount };
  deploy();
  res.redirect("/general");
};

exports.getGeneral = (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "store.html"));
};
