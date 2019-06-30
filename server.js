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

    //console.log("ultimo arquivo", lastFile)
    var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');

    var visualRecognition = new VisualRecognitionV3({
        version: '2018-03-19',
        iam_apikey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
    });


    var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');


    var visualRecognition = new VisualRecognitionV3({
        version: '2018-03-19',
        iam_apikey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
    });
    //console.log(directoryPath, lastFile);
    //var novo = path.join(directoryPath,"\\", lastFile);
    //console.log(novo);

    var img = "./uploads/" + nome;



    var images_file = fs.createReadStream(img);
    var classifier_ids = ["DefaultCustomModel_1915049257"];
    var threshold = 0.6;

    var params = {
        images_file: images_file,
        classifier_ids: classifier_ids,
        threshold: threshold
    };

    visualRecognition.classify(params, function (err, response) {
        if (err) {
            console.log(err);
            fs.unlinkSync(img);
            res.json({
                mensagem: "erro"
            })
        } else {
            console.log(JSON.stringify(response, null, 2))
            fs.unlinkSync(img);
            res.json(response);
            // Consulta IBM watson
        }
    });

})

app.post('/', upload.single('img'), (req, res) => {
    console.log(req.body, req.file);

    // include node fs module
    var fs = require('fs');
    res.sendFile(path.join(__dirname + '/resultado.html'));
})

app.listen(80, () => console.log("Running na porta 3000"))