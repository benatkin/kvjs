;(function() {
  var Template = function(template_doc) {
    this.tdoc =  template_doc;
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