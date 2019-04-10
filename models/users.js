module.exports = function(sequelize, Datatypes) {
    var user = sequelize.define("users", {
        phoneNumber: {
            type: Datatypes.text,
            allowNull: false,
            
        },
        password: {
            type: Datatypes.STRING,
            defaultValue: "password"
        }
    });
    return user;

};