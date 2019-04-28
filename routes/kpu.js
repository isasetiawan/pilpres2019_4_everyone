var express = require('express');
var router = express.Router();
const axios = require('axios')
const https = require('https')
const provinces = require('../consts/provinces')

const instance = axios.create({
  httpsAgent: new https.Agent({  
    rejectUnauthorized: false
  })
})

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    let {data} = await instance.get("https://pemilu2019.kpu.go.id/static/json/hhcw/ppwp.json");
    let {table, chart, ts} = data
    let keys = Object.keys(table)

    let persebaran = {}

    for(const key of keys){
      let name = provinces[key]
      persebaran[name] = table[key]
    }
    return res.json({chart,time:ts,persebaran}) 

  } catch (error) {
    console.log(error.Error)
    return res.json({msg:"error"})
  }
});

module.exports = router;
