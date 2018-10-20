var path = require('path');
var express = require('express');
var app = express();
const port = 3000;
 
if (app.get('env') === 'development' && false) {
  var livereload = require('easy-livereload');
  var file_type_map = {
    jade: 'html', // `index.jade` maps to `index.html`
    styl: 'css', // `styles/site.styl` maps to `styles/site.css`
    scss: 'css', // `styles/site.scss` maps to `styles/site.css`
    sass: 'css', // `styles/site.scss` maps to `styles/site.css`
    less: 'css' // `styles/site.scss` maps to `styles/site.css`
    // add the file type being edited and what you want it to be mapped to.
  };
  
  // store the generated regex of the object keys
  var file_type_regex = new RegExp('\\.(' + Object.keys(file_type_map).join('|') + ')$');
  
  app.use(livereload({
    watchDirs: [
      path.join(__dirname, 'public'),
      path.join(__dirname, 'app')
    ],
    checkFunc: function(file) {
      return file_type_regex.test(file);
    },
    renameFunc: function(file) {
      // remap extention of the file path to one of the extentions in `file_type_map`
      return file.replace(file_type_regex, function(extention) {
        return '.' + file_type_map[extention.slice(1)];
      });
    },
    port: process.env.LIVERELOAD_PORT || 35729
  }));
}


app.use(express.static('app'));
app.use(express.static('fonts'));
app.use(express.static('img'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
