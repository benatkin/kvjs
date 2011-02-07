function(doc) {
  var _ = this.ddoc.edoc_modules.underscore,
    mustache = this.ddoc.edoc_modules.mustache,
    ctx = {};
    _.each(this.tdoc.vars, function(value, key) {
      ctx[key] = value.default || value.placeholder;
    }, this);
    _.each(this.tdoc.vars, function(value, key) {
      if (value.default_to) {
        ctx[key] = ctx[value.default_to];
      }
    }, this);
    var doc_without_revisions = _.clone(doc);
    delete doc_without_revisions['_revisions'];
    var json = JSON.stringify(doc_without_revisions, null, 2);
    _.extend(ctx, {
      "title": doc.env.page.title,
      "body": mustache.to_html("<pre>{{json}}</pre>", {"json": json})
    });
  ctx.inline_styles = mustache.to_html(this.tdoc.styles, ctx);
  return mustache.to_html(this.tdoc.page, ctx);
}