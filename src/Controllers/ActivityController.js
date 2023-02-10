import dateFactory  from '../Factory/FactoryCalendar.js';
import { Activity } from '../Models/Activity.js';
import { User } from '../Models/User.js';



export var registrerActivities = async (req, res) => {
    const { name, description, datestarter, datefinish, hourstart, hourfinish, user } = req.body;
    User.findOne({ where: { slug: user } }).then((user) => {
    const factory = {
        startdate: datestarter,
        starthour: hourstart,
        enddate: datefinish,
        endhour: hourfinish
    }
    var newformat = dateFactory.Build(factory);
   Activity.create({
        id_user: user.id,
        name: name,
        description: description,
        datestarter: newformat.datestarter,
        datefinish: newformat.datefinish,
        status: 'open'
    }).then((data) => {
        console.log(data);
        return res.status(201).json({ message: 'Atividade registrada' });
    })
})

}

export var getActivities = async (req, res) => {
        User.findOne({ where: { slug: req.params.slug } }).then((user) => {
            if (user) {
                Activity.findAll({ where: { id_user: user.id } }).then((data) => {
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
            }, { where: { id: req.params.id } }).then((data) => {
                console.log(data);
                return res.status(200).json({ message: 'Atividade atualizada' });
            })
        } else {
            return res.status(401).json({ message: 'Atividade não encontrada' });
        }
    })
}

export var getUniqueActivities = async (req, res) => {
    User.findOne({ where: { slug: req.params.slug } }).then((user) => {
        if (user) {
            Activity.findAll({ where: { id_user: user.id, name: req.params.title } }).then((data) => {
                console.log(data);
                return res.status(200).json(data);    
            })
        } else {
            return res.status(401).json({ message: 'Usuário não encontrado' });
        }
    })
}

export var updateStatusActivies = async (req, res) => {
    Activity.findOne({ where: { id: req.params.id } }).then((data) => {
        if (data) {
            if(data.status === 'open'){
                Activity.update({
                    status: 'pendency'
                }, { where: { id: req.params.id } }).then((data) => {
                    console.log(data);
                    return res.status(200).json({ message: 'Atividade atualizada' });
                })
            }else{
                Activity.update({
                    status: 'open'
                }, { where: { id: req.params.id } }).then((data) => {
                    console.log(data);
                    return res.status(200).json({ message: 'Atividade atualizada' });
                })
            }
        } else {
            return res.status(401).json({ message: 'Atividade não encontrada' });
        }
    })
}