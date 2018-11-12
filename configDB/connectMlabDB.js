var value = require('./secretMLab');

module.exports = {
    getDBconnectionString:function(){
        return "mongodb://" + value.username + ":" + value.password + "@ds137483.mlab.com:37483/blogpost_new" ;
    } 
}