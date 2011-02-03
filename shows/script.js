function(doc, req) {
  var mustache = require('edocs/mustache/js_module'),
      script_renderer = require('edocs/script_renderer/js_module');
      
  var body = new(script_renderer.ScriptRenderer)({
    mustache: mustache,
    ddoc: this,
    doc: doc,
    req: req
  }).render();
  return {
    "headers": {
      "content-type": "text/javascript"
    },
    "body": body
  };
}