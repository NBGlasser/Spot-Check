module.exports = function(sequelize, DataTypes) {
    var blocks = sequelize.define("blocks", {
        Name: {
        type: DataTypes.STRING,
        allowNull: false
        },
        Comment: DataTypes.STRING,
        validate: {
            len: [0,280]
        }
    });

    return blocks;
};