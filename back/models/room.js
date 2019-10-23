module.exports = (sequelize, DataTypes) => {
    const Room = sequelize.define('Room', {
        title: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        max: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
        },
        owner: {
            type: DataTypes.STRING(10),
            allowNull: false,
        }
    },{
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글이 저장돼요
    });


    return Room;

};