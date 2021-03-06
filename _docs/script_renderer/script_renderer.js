;(function(){
  
var ScriptRenderer = function(p) {
  this.doc = p.doc;
  this.ddoc = p.ddoc;
  this.mustache = this.ddoc.edoc_modules.mustache;
  this.template = this.ddoc.edocs.script_renderer.template;
  this.methods = (this.doc.env.script.methods) || {};
};

ScriptRenderer.prototype = {
  indent: function(v, space) {
    if (typeof v === "string") {
      return v.replace(/\n/g, "\n" + space);
    }
    return v;
  },
  render_methods: function() {
    var lines = [];
    for (var key in this.methods) {
      var value = this.indent(this.doc[key], "    ");
      lines.push("    " + JSON.stringify(key) + ': ' + value);
    }
    return "{\n" + lines.join(",\n") + "\n  }"
  },
  render: function() {
    return this.mustache.to_html(this.template, {
      "className": this.doc.env.script.className,
      "construct": this.indent(this.doc.construct, "  "),
      "methods": this.render_methods(),
      "doc_id": this.doc._id
    });
  }
};

exports.ScriptRenderer = ScriptRenderer;

})(this);
