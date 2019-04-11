module.exports = function (sequelize, DataTypes) {
    var history = sequelize.define("history", {
        phoneNumber: {
            type: DataTypes.TEXT,
            allowNull: false,

        },

        lat: {
            type: DataTypes.FLOAT(11,7)
        },
        long: {
            type: DataTypes.FLOAT(11,7)
        },
        timeStamp: {
            type: DataTypes.STRING
        }

    });
    return history;
}