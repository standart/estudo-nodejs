var express = require("express")
	, fs = require("fs")
	, app = express();


var path_public = '/arquivos';

app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.set('view options', {layout: false});
	app.use(express.static(path_public));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
});

app.get('/', function(req, res){
	  fs.readdir(path_public, function(err, fotos){
	    res.render('fotos', {fotos: fotos});
	  });
});

app.post('/enviar-foto', function(req, res){
  var path_atual = req.files.foto.path;
  var path_image = path_public + '/' + req.files.foto.name;
  // Move a foto atual para a pasta pública.
  fs.rename(path_atual, path_image, function(err){
    // Exclui a foto da pasta temporária.
    fs.unlink(path_atual, function(err){
      res.redirect('/');
    });
  });	
});

app.listen(8800, function() {
  console.log('Galeria de fotos em execucao...');
})