const controller = require("../controllers/auth.controller");

module.exports = (app) => {
    app.post("/auth/signup", controller.singup);
    app.post("/auth/signin", controller.signin);
}