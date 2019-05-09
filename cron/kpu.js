const admin = require('firebase-admin')
const cron = require('node-cron')
const axios = require('axios')
const https = require('https')


const instance = axios.create({
    httpsAgent: new https.Agent({  
        rejectUnauthorized: false
    })
})

const serviceAccount = require('../idch-pilplres-firebase-adminsdk-4ngta-eca2eaa79c.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:"https://idch-pilplres.firebaseio.com"
})

const db = admin.firestore()

cron.schedule('*/30 * * * *', async ()=>{
    let {data} = await instance.get("https://pemilu2019.kpu.go.id/static/json/hhcw/ppwp.json");
    let {chart, ts, progress} = data

    let update_data = {
            jokowi:chart["21"]+"",
            prabowo:chart["22"]+"",
            source:"KPU",
            numOfTPS:progress.proses+"",
            time:new Date(),
        }

    let result = await db.collection('/votes').add(update_data)
    console.log(result,"after update")

})