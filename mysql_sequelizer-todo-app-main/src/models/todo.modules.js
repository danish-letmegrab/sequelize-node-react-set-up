module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define(
    "Todo",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      priority: {
        type: DataTypes.INTEGER,
      },
      status: {
        type: DataTypes.ENUM(
          "new",
          "in_progress",
          "completed",
          "deferred",
          "canceled"
        ),
        defaultValue: "new",
      },
      assigned_to: {
        type: DataTypes.INTEGER,
        allowNull: true, // Allow null if a task can be unassigned initially
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

  return Todo;
};
