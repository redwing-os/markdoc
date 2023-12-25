const fs = require('fs');
const path = require('path');
const express = require('express');
const marked = require('marked');
const highlight = require('highlight.js');
let mustacheExpress = require('mustache-express');
let bodyParser = require('body-parser');
const app = express();

// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/public');
app.use (bodyParser.urlencoded( {extended : true} ) );

marked.setOptions({
  highlight: function (code, lang) {
    const language = highlight.getLanguage(lang) ? lang : 'plaintext';
    return highlight.highlight(code, { language }).value;
  },
});

const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  const markdownFilePath = path.join(__dirname, 'public/docs/client/python.markdoc');
  const markdownContent = fs.readFileSync(markdownFilePath, 'utf8');
  const htmlContent = marked.parse(markdownContent);

  const templatePath = path.join(__dirname, 'public/index.mustache');

  // Read tab content
  const tab1 = fs.readFileSync(path.join(__dirname, 'public/tab1.mustache'), 'utf8');
  const tab2 = fs.readFileSync(path.join(__dirname, 'public/tab2.mustache'), 'utf8');
  res.render('index', {
    htmlContent: htmlContent,
    'tab-component': fs.readFileSync(path.join(__dirname, 'public/tab-component.mustache'), 'utf8'),
    tab1: tab1,
    tab2: tab2
  });  
});

// Dynamic route to handle requests in the format /:file_base/:file
app.get('/:file_base/:file', (req, res) => {
  const fileBase = req.params.file_base;
  const file = req.params.file;

  // Construct the file path based on the base directory and the file name
  const filePath = path.join(__dirname, `/${fileBase}/${file}.markdoc`);

  // Check if the file exists before attempting to read it
  if (fs.existsSync(filePath)) {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        // Handle potential read errors
        res.status(500).send('Error reading the file');
        return;
      }
      // Send the file content if successfully read
      res.type('text').send(data);
    });
  } else {
    // Send a 404 error if the file does not exist
    res.status(404).send('File not found');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;