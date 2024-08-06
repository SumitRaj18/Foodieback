const express = require('express');
const router = express();

router.post('/displaydata',(req,res)=>{
    try {
        res.send([global.Food, global.foodCategory])
    } catch (error) {
        console.error(error.message)
        res.send("Server error")
    }   
})

module.exports = router;