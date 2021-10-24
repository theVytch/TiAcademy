'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Compras extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Compras.belongsTo(models.Cliente, {foreignKey: 'ClienteId', as: 'clientes'});
      Compras.belongsToMany(models.Produtos,{
        foreignKey: 'ProdutoId',
        through: 'ItemCompras', as:'compras_ped'
      });
      Compras.hasMany(models.ItemCompras, {foreignKey: 'ComprasId', as: 'item_compra'});
    }
  };
  Compras.init({
    data: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Compras',
  });
  return Compras;
};