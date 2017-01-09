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


app.listen(3000, function(){
  console.log('listening on 3000');
});
