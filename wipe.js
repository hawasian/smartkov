module.exports = {
  wipe: function wipe() {
    var fs = require('fs');
    //Write JSON
    fs.writeFile('./sources/dictionary.json', JSON.stringify({}, null, 4), function(err) {
      if (err) return console.log(err);
      console.log('Dictionary Cleared');
    });
  }
};
