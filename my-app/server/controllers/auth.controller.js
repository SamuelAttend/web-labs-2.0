const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = db.user;
const singup = (req, res) => {
    new User({
        username: req.body.username,
        nickname: req.body.nickname,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    }).save().then((user, err) => {
        if (err)
        {
            return res.status(500).send({message: err});
        }
        res.status(200).send({message: `User ${user.username} was added`});
    })
}

const signin = (req, res) => {
    User.findOne({email: req.body.email}).then((user)=>{
        if (!user)
        {
            return res.status(404).send({message: `User with email '${req.body.email}' not found`});
        }
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (passwordIsValid)
        {
            const token = jwt.sign({id: user.id}, "secret", {expiresIn: 1000 * 60 * 60});
            return res.status(200).send({message: `User ${user.username} was authenticated`, user: {
                username: user.username,
                nickname: user.nickname,
                token
            }});
        }
        return res.status(404).send({message: `User ${user.username} was not authenticated`});
    }).catch((err) => {
        if (err)
        {
            return res.status(500).send({message: err});
        }
    })
}

module.exports = {singup, signin};