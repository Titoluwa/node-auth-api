// models/user.js
const { DataTypes } = require('sequelize');
const sequelize = require('../_sequelize');

const User = sequelize.define('users', {
  name: { 
    type: DataTypes.STRING, 
    allowNull: true 
  },
  username: { 
    type: DataTypes.STRING, 
    allowNull: true 
  },
  email: { 
    type: DataTypes.STRING, 
    unique: true,
    allowNull: false 
  },
  password: { 
    type: DataTypes.STRING, 
    allowNull:false 
  },
  lastLogin:{ 
    type: DataTypes.DATE, 
    allowNull: true 
  },
  isActive: { 
    type: DataTypes.BOOLEAN, 
    defaultValue: true 
  },
  isVerified:{ 
    type:DataTypes.BOOLEAN, 
    defaultValue: false 
  },
  // Add more columns as needed
});

module.exports = User;
