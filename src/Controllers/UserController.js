
import { User } from '../Models/User.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"

function generateToken(user) {
    return jwt.sign({
        user: user.slug,
        slug: user.slug,
        pass: user.pass        
    }, "tokensecret", {
      expiresIn: 43200 // expira 12 horas
    });
  }

export var registerUser = async (req, res) => {
    const { username } = req.body;
    User.findOne({ where: { username: username } }).then((user) => {
        if (!user) {
            User.create({
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password, 10),
                slug: req.body.username
            }).then((data) => {
                console.log(data);
            })
            return res.status(201).json({ message: 'Usuário registrado' });
        }else{
            return res.status(401).json({ message: 'Usuário já cadastrado' });
        }
    })

}

export var loginUser = (req, res) => {
    const { username, password } = req.body;
    User.findOne({ where: { username: username } }).then(async (user) => {
        if (user) {

            if (bcrypt.compareSync(password, user.password)) {
                var objectLogin = {
                    slug: user.slug,
                    pass: user.password
                }
                var token = await generateToken(objectLogin)
                res.status(200).json({message: 'Usuário logado', tokenLogin: token});
            } else {
                return res.status(401).json({ message: 'Senha incorreta' });
            }
        } else {
            return res.status(401).json({ message: 'Usuário não cadastrado' });
        }
    });
}

export var Token = (req,res) => {
    const {token} = req.body;
    jwt.verify(token,"tokensecret",(err,data) =>{
        var payload = jwt.decode(token)
        if (payload == null){
            res.status(401).json({message: 'Token incorreto'})
        }else{
            res.status(200).json(payload)
        }
    })
}


