function(doc, req) {
  var mustache = require('edocs/kvjs_mustache/mustache'),
      render_script = require('edocs/kvjs_render_script/render_script');
      
  var body = new(render_script.ScriptRenderer)({
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