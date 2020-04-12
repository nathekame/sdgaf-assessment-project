'use strict'

const estimator = require('./estimator');
const fs = require("fs");
//import { createReadStream } from 'fs';


const estimatorPostJSON =  async (req, res)=>{

  const dataToBeReturned = estimator(req.body);
  res.send(dataToBeReturned);

}


const estimatorPostXML =  async (req, res)=>{

  const dataToBeReturned = estimator(req.body);
  res.xml(dataToBeReturned);
  
}



const estimatorGetLogs =  async (req, res)=>{

      fs.stat('./covid19estimator.log', function (err, stats) {
        if (err) {
          res.sendStatus(404);
        }
        if(stats.isFile){

          const readStream = fs.createReadStream('./covid19estimator.log');
          readStream.pipe(res);
            
          readStream.on('error', (err) => {
           // console.log('Error in read stream...');
            //res.status(500).json(err);
            res.sendStatus(500);
          });
          res.on('error', (err) => {
              //console.log('Error in write stream...');
            res.sendStatus(500);
          });


        }else{
          res.sendStatus(404);
        }
     //   console.log(stats);
       // console.log("Got file info successfully!");
        
        // Check file type
     //   console.log("isFile ? " + stats.isFile());
      //  console.log("isDirectory ? " + stats.isDirectory());    
    });

 
          
     }
  



  
  module.exports = {
    
      estimatorPostJSON : estimatorPostJSON,
      estimatorPostXML : estimatorPostXML,
      estimatorGetLogs : estimatorGetLogs
    
    }