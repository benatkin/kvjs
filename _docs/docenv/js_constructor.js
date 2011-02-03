function(doc) {
  var key;
  for (key in doc) {
    if (doc.hasOwnProperty(key)) {
      this[key] = doc[key];
    }
  }
  if (this.kvjs && this.kvjs.edocs) {
    this.edoc_modules = {};
    for (key in this.kvjs.edocs) {
      if (this.edocs[key] && this.edocs[key].js_module) {
        this.edoc_modules[key] = require('edocs/' + key + '/js_module');
      }
    }
  }
}