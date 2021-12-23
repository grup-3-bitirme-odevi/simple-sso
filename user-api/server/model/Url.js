module.exports = (sequelize,DataTypes) => {
    const Url = sequelize.define('url', {
        id: {
            type: DataTypes.INTEGER(11),
            autoIncrement: true,
            primaryKey: true
        },
        url: {
            type: DataTypes.STRING(80),
            allowNull: false
        },
        
    }, {
        createdAt: false,
        updatedAt: false
    })

    return Url;
}