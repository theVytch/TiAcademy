'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Produtos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Produtos.belongsToMany(models.Compras,{
        through: 'ItemCompras', as: 'compras'
      });
      Produtos.hasMany(models.ItemCompras, {foreignKey: 'ComprasId', as: 'item_Produto'});
    }
  };
  Produtos.init({
    nome: DataTypes.STRING,
    descricao: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Produtos',
  });
  return Produtos;
};