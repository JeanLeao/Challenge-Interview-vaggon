import dateFactory  from '../Factory/FactoryCalendar.js';
import { Activity } from '../Models/Activity.js';
import { User } from '../Models/User.js';



export var registrerActivities = async (req, res) => {
    const { name, description, datestarter, datefinish, status, hourstart, hourfinish } = req.body;
    const factory = {
        startdate: datestarter,
        starthour: hourstart,
        enddate: datefinish,
        endhour: hourfinish
    }
    var newformat = dateFactory.Build(factory);
   Activity.create({
        name: name,
        description: description,
        datestarter: newformat.datestarter,
        datefinish: newformat.datefinish,
        status: status
    }).then((data) => {
        console.log(data);
        return res.status(201).json({ message: 'Atividade registrada' });
    })
}

export var getActivities = async (req, res) => {
        User.findOne({ where: { slug: req.params.slug } }).then((user) => {
            if (user) {
                Activity.findAll({ where: { slug: req.params.slug } }).then((data) => {
                        console.log(data);
                        return res.status(200).json(data);    
                })
            } else {
                return res.status(401).json({ message: 'Usuário não encontrado' });
            }
        })
}


export var deleteActivies = async (req, res) => {
    Activity.findOne({ where: { id: req.params.id } }).then((data) => {
        if (data) {
            Activity.destroy({ where: { id: req.params.id } }).then((data) => {
                console.log(data);
                return res.status(200).json({ message: 'Atividade deletada' });
            })
        } else {
            return res.status(401).json({ message: 'Atividade não encontrada' });
        }
    })
}

export var updateActivies = async (req, res) => {
    Activity.findOne({ where: { id: req.params.id } }).then((data) => {
        if (data) {
            Activity.update({
                name: req.body.name,
                description: req.body.description,
                datestarter: req.body.datestarter,
                datefinish: req.body.datefinish,
            }, { where: { id: req.params.id } }).then((data) => {
                console.log(data);
                return res.status(200).json({ message: 'Atividade atualizada' });
            })
        } else {
            return res.status(401).json({ message: 'Atividade não encontrada' });
        }
    })
}

export var updateStatusActivies = async (req, res) => {
    Activity.findOne({ where: { id: req.params.id } }).then((data) => {
        if (data) {
            Activity.update({
                status: req.body.status,
            }, { where: { id: req.params.id } }).then((data) => {
                console.log(data);
                return res.status(200).json({ message: 'Status da atividade atualizado para ' + req.body.status });
            })
        } else {
            return res.status(401).json({ message: 'Atividade não encontrada' });
        }
    })
}