function(doc) {
  // TODO: make it look at the doc & find the template
  var ddoc = this;
  return '<textarea>'+JSON.stringify(ddoc.edocs.docs['kvjs.centerbox'], null, 2)+'</textarea>'
}