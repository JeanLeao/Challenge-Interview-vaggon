import Sequelize from 'sequelize';
import { connection } from '../database/connection.js';
import { User } from './User.js';
    
export const Activity = connection.define('activity',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    datestarter: {
        type: Sequelize.DATE,
        allowNull: false
    },
    datefinish: {
        type: Sequelize.DATE,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    },
})
    User.sync({ force: true }).then(() => {
    console.log('Tabela criada com sucesso.');
    });

    Activity.sync({ force: true }).then(() => {
        console.log('Tabela criada com sucesso.');
        });

        
    User.hasMany(Activity);
    Activity.belongsTo(User);

