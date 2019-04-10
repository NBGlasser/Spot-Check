module.exports = function (sequelize, DataTypes) {
    var history = sequelize.define("history", {
        phoneNumber: {
            type: DataTypes.TEXT,
            allowNull: false,

        },

        lat: {
            type: DataTypes.FLOAT
        },
        long: {
            type: DataTypes.FLOAT
        },
        timeStamp: {
            type: DataTypes.STRING
        }

    });
    return history;
}