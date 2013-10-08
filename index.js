var express = require('express')
  , app = express();

app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.set('view options', {layout: false});
	app.use(express.bodyParser());
	app.use(express.methodOverride());
});

var clientes = [];

var validarCampos = function(req, res, next){
	if(!req.body.cliente.nome){
		return next(new Error('Informe o nome do cliente.'));
	}
	if(!req.body.cliente.idade){
	    return next(new Error('Informe a idade do cliente.'));
	}
	return next();
};

app.get('/', function(req, res){
	res.render('index', {clientes: clientes});	
});

app.post('/cliente', validarCampos ,function(req, res){
	var cliente = req.body.cliente;
	clientes.push(cliente);
	res.redirect('/');
});

app.get('/cliente/:id/editar', function(req, res){
	var id = req.params.id;
	res.render('edit', {cliente: clientes[id], id: id});
});

app.put('/cliente/:id', validarCampos ,function(req, res){
	var id = req.params.id;
	clientes[id] = req.body.cliente;
	res.redirect('/');
});

app.del('/cliente/:id', function(req, res){
	var id = req.params.id;
	clientes.splice(id, 1);
	res.redirect('/');
});
/*
app.use(function(req, res, next){
	res.render('404', {status: 404});
});
	

*/
app.use(function(err, req, res, next){
	res.render('500', {status: 500, error: err});
});

app.listen(8800);

console.log("Rodando aplicação via Express");

