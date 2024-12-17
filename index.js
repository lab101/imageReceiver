const express = require('express');
const app = express();
const base64Img = require('base64-img');
const bodyParser = require('body-parser');
const cors = require('cors')
const port = 8081;
const fs = require('fs');
const { readdirSync, rmSync } = require('fs');


app.use(cors())
app.use(express.static('./server/public'))
app.use(bodyParser.json({ limit: '50mb' }));

let frameNr =0;

let outputFolder = "./sequence_transp";

// create sequence folder if not exists

app.get('/start',async (req,res) =>{

    let dir = outputFolder;

    console.log("outputFolder: " + outputFolder);
        if (!fs.existsSync(outputFolder)){
            fs.mkdirSync(outputFolder);
        }

    readdirSync(dir).forEach(f => rmSync(`${dir}/${f}`));
    frameNr = 0;
    res.send("OK");
});


app.post('/upload', async (req, res) => {
        console.log("receiving upload " + frameNr);
        const img = req.body.file;

        // create output folder if not exists
        
        frameNr++;
        let frameNrWithPadding = String("00000" + frameNr).slice(-5);
        base64Img.img(img,outputFolder,"img_" + frameNrWithPadding,function(err,path){
    });
         
    res.send("OK");
})



app.listen(port, () => {
  console.info(`listening on port ${port}`);
})