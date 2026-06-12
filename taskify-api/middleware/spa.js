const path = require('path');
const { static } = require('express');
const { fileURLToPath } = require('url');

const spaDefault = (req,res)=>{
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
};

module.exports = {
    spa: static(path.join(__dirname,'../public')),
    spaDefault: spaDefault
}