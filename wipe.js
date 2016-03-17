module.exports = {
  wipe: function wipe(dict) {
    var fs = require('fs');
    //Write JSON
    fs.writeFile(dict, JSON.stringify({}, null, 4), function(err) {
      if (err) return console.log(err);
      //console.log('Dictionary Cleared \n');
    });
  }
};
