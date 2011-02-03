;(function() {
  var Template = function(template_spec) {
    this.template_spec =  template_spec;
  };
  
  if (exports) {
    exports.Template = Template;
  } else {
    this.kvjs_template = {};
    this.kvjs_template.Template = Template;
  }
  
  Template.prototype = {
    "render": function(doc) {
      return this.page + '.....';
    }
  };
})(this);