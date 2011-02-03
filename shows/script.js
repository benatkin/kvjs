function(doc, req) {
  var docenv = require('edocs/docenv/js_module'),
      ddoc = new(docenv.DocEnv)(this),
      ScriptRenderer = ddoc.edoc_modules.script_renderer.ScriptRenderer;
      
  var body = new(ScriptRenderer)({
    ddoc: ddoc,
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