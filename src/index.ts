import express from 'express';
// const express = require('express');

import { hello } from '@/routes/index.route';

const app = express();

app.get('/', (req, res) => {
  res.send('<b>You rocks</b>');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

/* const funcionAsync = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("2 seconds have passed");
            resolve();
        }, 2000);
    });
}

async function funcionSync(){
    funcionAsync().then(() =>{
        console.log("Hello world!");
    }).catch((error) => {
        console.log(error);
    }); // async await
    
}

funcionSync();

*/
