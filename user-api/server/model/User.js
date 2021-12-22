module.exports = (sequelize,DataTypes) => {
    const User = sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER(11),
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING(45),
            allowNull: false,
            unique: true
        },
        user_name: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        user_surname: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        user_password: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        user_email: {
            type: DataTypes.STRING(45),
            allowNull:false,
            unique: true
        },
        user_type: {
            type: DataTypes.STRING(10),
            default: 'user'
        }
    }, {
        createdAt: false,
        updatedAt: false
    })

    return User;
}