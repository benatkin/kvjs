;(function() {
  var Page = function(doc) {
    // not used yet?
    if (doc.env && doc.env.page && doc.env.page.template)
      tdoc = doc.app.edocs[doc.env.page.template];
    if (typeof tdoc !== "object" && doc.app.env && doc.app.env.app && doc.app.env.app.template)
      tdoc = doc.app.edocs[doc.app.env.app.template];
    if (typeof tdoc !== "object")
      tdoc = doc.app.edocs.centerbox;
    return new(doc.app.edoc_modules.template.Template)(tdoc, doc.app).render(doc);
  };
  
  if (exports) {
    exports.Page = Page;
  } else {
    this.page = {};
    this.page.Page = Page;
  }
  
  Page.prototype = {

  };
})(this);