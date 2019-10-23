module.exports = (sequelize, DataTypes) => {
    const Chat = sequelize.define('Chat', {
        room: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        user: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        chat: {
            type: DataTypes.STRING(100),
        },
    },{
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글이 저장돼요
    });

    return Chat;

};