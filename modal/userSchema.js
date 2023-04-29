const Sequelize=require('sequelize');
const db=require('../config/mssmConnection');

const User=db.define('User',{
user_id:{
   type:Sequelize.INTEGER,
   primaryKey:true,
   autoIncrement:true,
   allowNull:false,
},
user_username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  user_roles: {
    type: Sequelize.JSON,
    defaultValue: { User: 2001 },
  },
  user_password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  user_email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  user_refreshToken: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null,
  },
  user_phone: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  user_createdAt: {
    type: Sequelize.DATE,
    allowNull:false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    field: 'user_createdAt'
  },
  user_updatedAt: {
    type: Sequelize.DATE,
    allowNull:false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    field: 'user_updatedAt'
  },
},{
    Sequelize,
    modelName: 'User',
    timestamps: false 
})

module.exports= User;