const controller = require("../controllers/chats.controller");

module.exports = function(app) {
    app.post('/chats', controller.createChat);
    app.get('/chats', controller.getChats);
    app.delete('/chats/:id', controller.deleteChat);
    app.put('/chats/:id', controller.updateChat);
}