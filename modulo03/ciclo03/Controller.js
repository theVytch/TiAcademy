const express = require('express');
const cors = require('cors');

const {Sequelize} = require('./models');

const models = require('./models');

const app = express();
app.use(cors());
app.use(express.json());

let cliente = models.Cliente;
let itemPedido = models.ItemPedido;
let pedido = models.Pedido;
let servico = models.Servico;

let compras = models.Compras;
let produtos = models.Produtos;
let itemCompras = models.ItemCompras;

app.get('/', function(req, res){
    res.send('Ola mundo')
});

app.post('/servicos', async(req, res) => {
    await servico.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "Servico criado com sucesso!"
        })
    }).catch(function(error){
        return res.status(400).json({
            error: true,
            message: "Foi impossivel se conectar!"  
        })
    });
});

app.get('/listaservicos', async(req, res) => {
    await servico.findAll({
        raw: true
    }).then(function(servicos){
        res.json({servicos})
    });
});

app.get('/ofertaservicos', async(req, res) => {
    await servico.count('id').then(function(servicos){
        res.json({servicos});
    });
});

app.get('/servico/:id', async(req, res) => {
    await servico.findByPk(req.params.id).then(servico => {
        return res.json({
            error: false,
            servico
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro: código não encontrado!"
        });
    });
});

app.put('/atualizaservico', async(req, res) => {
    await servico.update(req.body,{
        where: {id: req.body.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Serviço foi alterado com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro de alteração de usuario!"
        });
    });
});


app.delete('/apagarservico/:id', async(req, res) => {
    servico.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Serviço excluido com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro ao tentar excluir serviço!"
        });
    });
});

app.post('/clientes', async(req, res) => {
    await cliente.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "Cliente criado com sucesso!"
        })
    }).catch(function(error){
        return res.status(400).json({
            error: true,
            message: "Foi impossivel se conectar!"  
        })
    });
});

app.get('/listaclientes', async(req, res) => {
    await cliente.findAll({
        raw: true
    }).then(function(clientes){
        res.json({clientes})
    });
});

app.get('/pedidos/:id',  async(req, res) => {
    await pedido.findByPk(req.params.id,{include:[{all: true}]}).then(ped => {
        return res.json({ped});
    })
})

app.post('/pedidos', async(req, res) => {
    await pedido.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "Pedido criado com sucesso!"
        })
    }).catch(function(error){
        return res.status(400).json({
            error: true,
            message: "Foi impossivel se conectar!"  
        })
    });
});

app.get('/listapedidos', async(req, res) => {
    await pedido.findAll({
        raw: true
    }).then(function(pedidos){
        res.json({pedidos})
    });
});


app.post('/itemPedidos', async(req, res) => {
    await itemPedido.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "ItemPedido criado com sucesso!"
        })
    }).catch(function(error){
        return res.status(400).json({
            error: true,
            message: "Foi impossivel se conectar!"  
        })
    });
});

app.get('/listaitempedidos', async(req, res) => {
    await itemPedido.findAll({
        raw: true
    }).then(function(itemPedidos){
        res.json({itemPedidos})
    });
});

/*  --------------------------------     CRUD desafios    ---------------------------------------    */
/*  --------------------------------     CRUD Compras    ---------------------------------------    */

app.get('/listacompras', async(req, res) => {
    await compras.findAll({
        raw: true
    }).then(function(compras){
        res.json({compras})
    });
});

app.post('/compras', async(req, res) => {
    await compras.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "Compras criado com sucesso!"
        })
    }).catch(function(error){
        return res.status(400).json({
            error: true,
            message: "Foi impossivel se conectar!"  
        })
    });
});

app.put('/atualizacompras', async(req, res) => {
    await compras.update(req.body,{
        where: {id: req.body.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Compras foi alterado com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro de alteração de compras!"
        });
    });
});

app.delete('/apagarcompras/:id', async(req, res) => {
    await compras.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Serviço excluido com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro ao tentar excluir compras!"
        });
    });
});

/*  --------------------------------     CRUD Compras    ---------------------------------------    */
/*  --------------------------------     CRUD Produtos   --------------------------------------    */

app.get('/listaprodutos', async(req, res) => {
    await produtos.findAll({
        raw: true
    }).then(function(produtos){
        res.json({produtos})
    });
});

app.post('/produtos', async(req, res) => {
    await produtos.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "Produto criado com sucesso!"
        })
    }).catch(function(error){
        return res.status(400).json({
            error: true,
            message: "Foi impossivel se conectar!"  
        })
    });
});

app.put('/atualizaprodutos', async(req, res) => {
    await produtos.update(req.body,{
        where: {id: req.body.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Produto foi alterado com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro de alteração de produtos!"
        });
    });
});

app.delete('/apagarproduto/:id', async(req, res) => {
    await produtos.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Produto excluido com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro ao tentar excluir Produto!"
        });
    });
});

/*  --------------------------------     CRUD Produtos   --------------------------------------    */
/*  --------------------------------     CRUD ItemCompras   --------------------------------------    */

app.get('/listaitemcompras', async(req, res) => {
    await itemCompras.findAll({
        raw: true
    }).then(function(itemCompras){
        res.json({itemCompras})
    });
});

app.post('/itemcompras', async(req, res) => {
    await itemCompras.create(
        req.body
    ).then(function(){
        return res.json({
            error: false,
            message: "ItemCompra criado com sucesso!"
        })
    }).catch(function(error){
        return res.status(400).json({
            error: true,
            message: "Foi impossivel se conectar!"  
        })
    });
});

app.put('/atualizaitemcompras', async(req, res) => {
    await itemCompras.update(req.body,{
        where: {id: req.body.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "ItemCompras foi alterado com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro de alteração de ItemCompras!"
        });
    });
});

app.delete('/apagaritemcompras/:id', async(req, res) => {
    await itemCompras.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "ItemCompra excluido com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro ao tentar excluir ItemCompras!"
        });
    });
});
/*  --------------------------------     CRUD ItemCompras    --------------------------------------    */

let port = process.env.PORT || 3001;

app.listen(port,(req, res) => {
    console.log('Servidor ativo: http://localhost:3001');
})