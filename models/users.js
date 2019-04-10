module.exports = function(sequelize, DataTypes) {
    var user = sequelize.define("users", {
        phoneNumber: {
            type: DataTypes.TEXT,
            allowNull: false,
            
        },
        password: {
            type: DataTypes.STRING,
            defaultValue: "password"
        }
    });
    return user;

};