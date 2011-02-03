;(function() {
  var Template = function(template_spec) {
    this.template_spec =  template_spec;
  };
  
  if (exports) {
    exports.Template = Template;
  } else {
    this.template = {};
    this.template.Template = Template;
  }
  
  Template.prototype = {
    "render": function(doc) {
      return this.template_spec.page + 'test';
    }
  };
})(this);