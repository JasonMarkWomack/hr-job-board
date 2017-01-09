var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cons = require('consolidate'),
    dust = require('dustjs-helpers'),
    pg = require('pg'),
    app = express();

// DB connection string
var connect  = "postgres://edudev:yourpassword@localhost/jobboard";

app.engine('dust', cons.dust);

app.set('view engine', 'dust');
app.set('views', __dirname + '/views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req,res){
  pg.connect(connect, function(err, client, done){
    if(err){
      return console.error('error fetching client from pool',err);
    }
    client.query('SELECT * FROM devjobs', function(err,result){
      if(err){
        return  console.error('error running your query',err);
      }
res.render('index', {devjobs: result.rows});
      done();
    });
  });
});
app.post('/add',function(req,res){
  pg.connect(connect, function(err, client, done){
    if(err){
      return console.error('error fetching client from pool',err);
    }
  client.query("INSERT INTO  devjobs(name, salary, description) VALUES($1,$2,$3)",
[req.body.name, req.body.salary, req.body.description]);
done();
res.redirect('/');
});
});

app.delete('/delete/:id', function(req,res){
  pg.connect(connect, function(err, client, done){
    if(err){
      return console.error('error fetching client from pool',err);
    }
  client.query("DELETE FROM devjobs WHERE id = $1",
[req.params.id]);
done();
res.send(200);
});
});

app.post('/edit',function(req,res){
  pg.connect(connect, function(err, client, done){
    if(err){
      return console.error('error fetching client from pool',err);
    }
  client.query("UPDATE  devjobs SET name=$1, salary=$2, description=$3 WHERE id = $4",
  [req.body.name, req.body.salary, req.body.description, req.body.id]);
done();
res.redirect('/');
});

});


app.listen(3000, function(){
  console.log('listening on 3000');
});
