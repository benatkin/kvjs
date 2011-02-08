function(doc) {
  var docenv = require('edocs/docenv/js_module'),
      ddoc = new(docenv.DocEnv)(this),
      tdoc;
      
  if (doc) {
    if (doc.env && doc.env.page && doc.env.page.template)
      tdoc = ddoc.edocs[doc.env.page.template];
    if (typeof tdoc !== "object")
      tdoc = ddoc.edocs.centerbox;
    return new(ddoc.edoc_modules.template.Template)(ddoc, tdoc).render(doc);
  }
  
  return {
    code: 404,
    body: "<h1>Not found.</h1>"
  };
}