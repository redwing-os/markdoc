const fs = require('fs');
const path = require('path');
const express = require('express');
const marked = require('marked');
const highlight = require('highlight.js');
const mustache = require('mustache');

marked.setOptions({
  highlight: function (code, lang) {
    const language = highlight.getLanguage(lang) ? lang : 'plaintext';
    return highlight.highlight(code, { language }).value;
  },
});

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  const markdownFilePath = path.join(__dirname, 'docs/python.markdoc');
  const markdownContent = fs.readFileSync(markdownFilePath, 'utf8');
  const htmlContent = marked.parse(markdownContent);

  const templatePath = path.join(__dirname, 'public/index.html');
  fs.readFile(templatePath, 'utf8', (err, templateHtml) => {
    if (err) {
      res.status(500).send('Error loading the template');
      return;
    }

    // Read tab content
    const tab1 = fs.readFileSync(path.join(__dirname, 'public/tab1.html'), 'utf8');
    const tab2 = fs.readFileSync(path.join(__dirname, 'public/tab2.html'), 'utf8');

    // Render with Mustache
    const rendered = mustache.render(templateHtml, { htmlContent }, {
      'tab-component': fs.readFileSync(path.join(__dirname, 'public/tab-component.html'), 'utf8'),
      'tab1': tab1,
      'tab2': tab2
    });

    res.send(rendered);
  });
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
