const express = require('express');
const app = express();
console.log(5+2);
app.listen(3000, function(){
    console.log("listening at 3000")
} );


app.use(express.static("public")); 