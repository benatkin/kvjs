function(doc, req) {
  var mustache = require('edocs/kvjs_mustache/mustache'),
      render_script = require('edocs/kvjs_render_script/render_script');
      
  var body = render_script.render({
    mustache: mustache,
    ddoc: this,
    doc: doc,
    req: req
  });
  return {
    "headers": {
      "content-type": "text/javascript"
    },
    "body": body
  };
}