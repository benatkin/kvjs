;(function(){
  
var ScriptRenderer = function(p) {
  this.mustache = p.mustache;
  this.doc = p.doc;
  this.ddoc = p.ddoc;
  this.template = this.ddoc.edocs.kvjs_render_script.template;
  this.functions = (this.doc.kvjs && this.doc.kvjs.functions) || {};
}

ScriptRenderer.prototype = {
  indent: function(v, space) {
    if (typeof v === "string") {
      return v.replace(/\n/g, "\n" + space);
    }
    return v;
  },
  render_prototype: function() {
    var lines = [], value;//, sorted = Object.keys(this.doc);
    //sorted.sort();
    for (var key in this.doc) {
      if (['_id', '_rev', 'kvjs', 'constructor_fn', 'couchapp', '_revisions', 'module'].indexOf(key) !== -1) continue;
      value = this.indent(this.functions[key] ? this.doc[key] : JSON.stringify(this.doc[key], null, 2), "    ");
      lines.push("    " + JSON.stringify(key) + ': ' + value);
    }
    return "{\n" + lines.join(",\n") + "\n  }"
  },
  render: function() {
    return this.mustache.to_html(this.template, {
      "js_class": this.doc.kvjs.js_class,
      "constructor_fn": this.indent(this.doc.constructor_fn, "  "),
      "prototype": this.render_prototype(),
      "doc_id": this.doc._id
    });
  }
};

exports.ScriptRenderer = ScriptRenderer;

exports.render = function(p) {
  var script_renderer = new ScriptRenderer(p);
  return script_renderer.render();
};

})(this);