const fs = require('fs');
const path = require('path');
const express = require('express');
const marked = require('marked');
const highlight = require('highlight.js');
// const mustache = require('mustache');
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
  const markdownFilePath = path.join(__dirname, 'public/docs/python.markdoc');
  const markdownContent = fs.readFileSync(markdownFilePath, 'utf8');
  const htmlContent = marked.parse(markdownContent);

  const templatePath = path.join(__dirname, 'public/index.mustache');

  //     // Read tab content
  const tab1 = fs.readFileSync(path.join(__dirname, 'public/tab1.mustache'), 'utf8');
  const tab2 = fs.readFileSync(path.join(__dirname, 'public/tab2.mustache'), 'utf8');
  res.render('index', {
    htmlContent: htmlContent,
    'tab-component': fs.readFileSync(path.join(__dirname, 'public/tab-component.mustache'), 'utf8'),
    tab1: tab1,
    tab2: tab2
  });  
//   fs.readFile(templatePath, 'utf8', (err, templateHtml) => {
//     if (err) {
//       console.error(err); // Log the error to the console
//       res.status(500).send('Error loading the template');
//       return;
//     }

//     // Read tab content
//     const tab1 = fs.readFileSync(path.join(__dirname, 'public/tab1.html'), 'utf8');
//     const tab2 = fs.readFileSync(path.join(__dirname, 'public/tab2.html'), 'utf8');

//     // Render with Mustache
//     const rendered = mustache.render(templateHtml, { htmlContent }, {
//       'tab-component': fs.readFileSync(path.join(__dirname, 'public/tab-component.html'), 'utf8'),
//       'tab1': tab1,
//       'tab2': tab2
//     });

//     res.send(rendered);
//   });
});

// Serve markdoc files
app.get('/docs/:language.markdoc', (req, res) => {
  const language = req.params.language;
  const filePath = path.join(__dirname, `docs/${language}.markdoc`);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(404).send('File not found');
      return;
    }
    res.type('text').send(data);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;
