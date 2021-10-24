'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemCompras extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ItemCompras.belongsTo(models.Compras, {foreignKey: 'ComprasId', as: 'compras'});
      ItemCompras.belongsTo(models.Produtos, {foreignKey: 'ProdutoId', as: 'produto'});
    }
  };
  ItemCompras.init({
    quantidade: DataTypes.INTEGER,
    valor: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'ItemCompras',
  });
  return ItemCompras;
};