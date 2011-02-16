function(doc) {
  var App = require('edocs/app/app').App,
      app = new App(this),
      tdoc;
      
  if (doc) {
    if (doc.env && doc.env.page && doc.env.page.template)
      tdoc = app.edocs[doc.env.page.template];
    if (typeof tdoc !== "object" && app.env && app.env.app && app.env.app.template)
      tdoc = app.edocs[app.env.app.template];
    if (typeof tdoc !== "object")
      tdoc = app.edocs.centerbox;
    return new(app.edoc_modules.template.Template)(app, tdoc).render(doc);
  }
  
  return {
    code: 404,
    body: "<h1>Not found.</h1>"
  };
}
