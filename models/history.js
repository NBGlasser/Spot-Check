module.exports = function (sequelize, Datatypes) {
    var history = sequelize.define("history", {
        phoneNumber: {
            type: Datatypes.text,
            allowNull: false,

        },

        lat: {
            type: Datatypes.float
        },
        long: {
            type: Datatypes.float
        },
        timeStamp: {
            type: Datatypes.string
        }

    });
    return history;
}