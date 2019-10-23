module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        userId: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        userName: {
            type: DataTypes.STRING(5),
            allowNull: false,
        },
        userGender: {
            type: DataTypes.STRING(2),
            allowNull: false,
        }
    },{
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글이 저장돼요
    });

    User.associate = (db) => {
      };

    return User;

};