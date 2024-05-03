module.exports = (sequelize, Sequelize, DataTypes) => {
  const User = sequelize.define(
    "users", // Model name
    {
      // Model attributes
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      email: {
        type: DataTypes.STRING,
        unique: true,
      },

      password: {
        type: DataTypes.STRING(255),
      },
    },
    {
      // Options
      timestamps: true,
      underscrored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return User;
};
