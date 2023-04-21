const middleware = require("../middlewares/auth.middleware");

module.exports = (app) => {
    app.get("/auth/requireAuth", [middleware.verifyToken], (req, res) => {
        res.status(200).send("requireAuth route");
    });
    app.get("/auth/notRequireAuth", (req, res) => {
        res.status(200).send("notRequireAuth route");
    });
}