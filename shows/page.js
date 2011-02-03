function(doc) {
  // TODO: make it look at the doc & find the template
  var docenv = require('edocs/docenv/js_module'),
      ddoc = new(docenv.DocEnv)(this);
  
  return new(ddoc.edoc_modules.template.Template)(ddoc.edocs.centerbox).render(doc);
}