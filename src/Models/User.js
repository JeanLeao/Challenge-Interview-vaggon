import Sequelize from 'sequelize';
import { connection } from '../database/connection.js';
    
export const User = connection.define('user',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username:{
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },

})
    //User.sync({ force: true }).then(() => {
    //console.log('Tabela criada com sucesso.');
    // });

//Category.hasMany(Article); // Tem MUITOS
//Article.belongsTo(Category); // UM PARA UM
//Article.sync({force: true});
