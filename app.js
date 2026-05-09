// Reachable: lodash.merge called with user-supplied data (GHSA-jf85-cpcp-j695 prototype pollution)
const _ = require('lodash');
// Reachable: marked.parse called with untrusted input (GHSA-rrrm-qjm4-v8hf XSS)
const marked = require('marked');
const express = require('express');

const app = express();

app.get('/render', (req, res) => {
  // Reachable vulnerable path: prototype pollution via lodash.merge
  const base = {};
  _.merge(base, req.query);

  // Reachable vulnerable path: XSS via marked
  const html = marked(req.query.input || '# Hello');
  res.send(html);
});

// Unreachable: this function is defined but never called from main execution
function processTemplate(tpl) {
  return marked(tpl);
}

app.listen(3000);
