const db = require("../models")

const Chat = db.chat;

const createChat = (req, res) => {
    new Chat({
        name: req.body.name,
        participants: req.body.participants,
        owner: req.body.owner,
        messages: []
    }).save().then((chat, err) => {
        if (err)
        {
            return res.status(500).send({message: err});
        }
        res.status(200).send({message: `Chat ${chat.name} was created`});
    })
}

const getChats = (req, res) => {
    Chat.find({participants: req.body.participants}).then((chats) => {
        if (chats.length == 0)
        {
            return res.status(404).send({message: `Chats with ${req.body.participants} were not found`});
        }
        return res.status(200).send({message: `Chats with ${req.body.participants} were found`, chats});
    }).catch((err) => {
        if (err)
        {
            return res.status(500).send({message: err});
        }
    })
}

const deleteChat = (req, res) => {
    const _id = req.params.id;
    Chat.findOne({_id}).then((chat)=>{
        if (!chat)
        {
            return res.status(404).send({message: `Chat ${req.body.name} was not found`});
        }
        if (chat.owner === req.body.owner)
        {
            const name = chat.name;
            Chat.deleteOne({_id}).then(() => {
                return res.status(200).send({message: `Chat ${name} was deleted`});
            }).catch((err) => {
                if (err)
                {
                    return res.status(500).send({message: err});
                }
            })
        }
    }).catch((err) => {
        if (err)
        {
            return res.status(500).send({message: err});
        }
    })
}

const updateChat = (req, res) => {
    Chat.updateOne({_id: req.params.id}, {
        name: req.body.name,
        participants: req.body.participants,
        owner: req.body.owner,
        messages: req.body.message
    }).then((chat) => {
        if (!chat)
        {
            return res.status(404).send({message: `Chat ${req.body.name} was not found`});
        }
        return res.status(200).send({message: `Chat ${req.body.name} was updated`});
    }).catch((err) => {
        if (err)
        {
            return res.status(500).send({message: err});
        }
    })
}

module.exports = {createChat, getChats, deleteChat, updateChat};