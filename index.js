const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;
const app = express(); 


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get("/api/ping", (req, res) => {
    res.json({"success":true});
  });

app.use('/api/posts', require('./routes/Blogpost'));

  
app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
 });

module.exports = app
 

