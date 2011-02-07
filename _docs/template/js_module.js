;(function() {
  var Template = function(design_doc, template_doc) {
    this.ddoc = design_doc;
    this.tdoc = template_doc;
  };
  
  if (exports) {
    exports.Template = Template;
  } else {
    this.template = {};
    this.template.Template = Template;
  }
  
  Template.prototype = {
    "render": function(doc) {
      return this.tdoc.page;
    }
  };
})(this);