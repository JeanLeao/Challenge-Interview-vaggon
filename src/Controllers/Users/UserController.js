
import { User } from '../../Models/User.js';
import bcrypt from 'bcrypt';

export var registerUser = async (req, res) => {
    const { username, password, slug } = req.body;
    User.findOne({ where: { username: username } }).then((user) => {
        if (!user) {
            User.create({
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password, 10),
                slug: req.body.slug
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
    User.findOne({ where: { username: username } }).then((user) => {
        if (user) {
            if (bcrypt.compareSync(password, user.password)) {
                return res.status(200).json({ message: 'Usuário logado', slug: user.slug, pass: user.password });
            } else {
                return res.status(401).json({ message: 'Senha incorreta' });
            }
        } else {
            return res.status(401).json({ message: 'Usuário não cadastrado' });
        }
    });
}

