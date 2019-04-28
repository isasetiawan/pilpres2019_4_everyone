var express = require('express');
var router = express.Router();
const axios = require('axios')
const https = require('https')

const instance = axios.create({
  httpsAgent: new https.Agent({  
    rejectUnauthorized: false
  })
})

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    let {data} = await instance.get("https://pemilu2019.kpu.go.id/static/json/hhcw/ppwp.json");
    return res.json(data)   
  } catch (error) {
    console.log(error.Error)
    return res.json({msg:"error"})
  }
});

module.exports = router;
