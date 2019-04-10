module.exports = function(sequelize, DataTypes) {
    var blocks = sequelize.define("blocks", {
        name: {
        type: DataTypes.TEXT,
        allowNull: false
        },
        Comment: DataTypes.TEXT
    });

    return blocks;
};