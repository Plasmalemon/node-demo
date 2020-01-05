const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const OrderItem = Sequelize.define("orderIrem", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  quantity: Sequelize.INTEGER
});

module.exports = OrderItem;
