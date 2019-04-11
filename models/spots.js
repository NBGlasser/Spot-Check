module.exports = function(sequelize, DataTypes) {
    var spots = sequelize.define("spots", {
        latitude: {
            type: DataTypes.DECIMAL(11,7),
            allowNull: false
        },
        longitude: {
            type: DataTypes.DECIMAL(11,7),
            allowNull: false
        },
        occupied: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
    });

    spots.associate = function(models) {
        spots.belongsTo(models.users,{
            foreignKey: {
                allowNull: false
            }
        });
        // spots.belongsTo(models.blocks,{
        //     foreignKey: {
        //         allowNull: false
        //     }
        // });

    };
    return spots;
};