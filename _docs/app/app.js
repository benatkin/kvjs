;(function() {
  var App = function(doc, require_prefix) {
    require_prefix = require_prefix || "";
    var key;
    for (key in doc) {
      if (doc.hasOwnProperty(key)) {
        this[key] = doc[key];
      }
    }
    if (this.env && this.env.edocs) {
      this.edoc_modules = {};
      for (key in this.env.edocs) {
        if (this.edocs[key] && this.edocs[key].js_module) {
          this.edoc_modules[key] = require(require_prefix + 'edocs/' + key + '/js_module');
        } else if (this.edocs[key] && this.edocs[key].env && this.edocs[key].env.script && this.edocs[key].env.script.commonjs) {
          this.edoc_modules[key] = require(require_prefix + 'edocs/' + key + '/' + key);
        }
      }
    }
  };
  
  if (exports) {
    exports.App = App;
  } else {
    this.app = {};
    this.app.App = App;
  }
  
  App.prototype = {

  };
})(this);