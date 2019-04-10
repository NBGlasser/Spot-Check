var bcrypt = require("bcrypt-nodejs");

module.exports = function(sequelize, Datatypes) {
    var users = sequelize.define("users", {
        phoneNumber: {
            type: Datatypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [10]
            }
        },
        password: {
            type: Datatypes.STRING,
            defaultValue: "password",
            allowNull: false
        }

    });

    // users.prototype.validpassword = function(password){
    //     return bcrypt.compareSync(password, this.password);
    // };

    // users.hook("beforeCreate", function(user){
    //     user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    // });

    return users;

};