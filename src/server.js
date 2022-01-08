const app=require('./index');

const connect = require('./configs/db');
const port =process.env.PORT || 2345
app.listen(process.env.PORT || 2345, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });