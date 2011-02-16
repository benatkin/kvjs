function(doc, req) {
  var App = require('edocs/app/app').App,
      app = new App(this),
      ScriptRenderer = app.edoc_modules.script_renderer.ScriptRenderer;
      
  var body = new(ScriptRenderer)({
    ddoc: app,
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
