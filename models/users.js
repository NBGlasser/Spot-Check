module.exports = function(sequelize, Datatypes) {
    var users = sequelize.define("users", {
        phoneNumber: {
            type: Datatypes.STRING,
            allowNull: false,
            validate: {
                len: [10]
            }
        },
        password: {
            type: Datatypes.STRING,
            defaultValue: "password"
        }

    });

};