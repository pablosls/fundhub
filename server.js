const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var path = require('path');

var fs = require('fs');

const multer = require("multer");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage })

app.use(
    bodyParser.urlencoded({
        extended: false
    })
)
app.use(bodyParser.json())
app.use('/static', express.static('public'));






// // viewed at http://localhost:8080
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

// // viewed at http://localhost:8080
app.get('/agende', function (req, res) {
    res.sendFile(path.join(__dirname + '/agende.html'));
});


var nome;

app.get('/Find', (req, res) => {
    // obtem ultima imagem 

    //requiring path and fs modules
    const path = require('path');
    //joining path of directory 
    const directoryPath = path.join(__dirname, 'uploads');
    //passsing directoryPath and callback function

    var lastFile = "";

    const testFolder = './uploads/';
    const fs = require('fs');



    var arquivos = [];

    fs.readdir(testFolder, (err, files) => {
        files.forEach(file => {
            //console.log(file);
            arquivos.push(file);
            nome = file;
            //console.log(nome);
        });
    });

    //var fs = require('fs');
    var files = fs.readdirSync('./uploads');
    for (var i in files) {
        //var definition = require('../application/models/' + files[i]).Model;
        console.log('Model Loaded: ' + files[i]);
    }
    console.log("print files");
    console.log(files[0]);
    console.log("print files");


    nome = files[0];
    console.log("nome", nome);

    var img = "./uploads/" + nome;

    var images_file = fs.createReadStream(img);
 
    var threshold = 0.6;

    res.json({
        mensagem: "ok"
    })
})

app.post('/', upload.single('img'), (req, res) => {
    console.log(req.body, req.file);

    var fs = require('fs');
    res.sendFile(path.join(__dirname + '/resultado.html'));
})

const port = process.env.PORT || 3000

app.listen(port, () => console.log("Running na porta 3000"))