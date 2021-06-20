//Import app 
const app = require('./app.js')

//Database
require('./database');

//Settings
app.set('port', process.env.PORT || 8080);

//Server inicializacion 
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});

