;(function() {
  var {{{ className }}} = {{{ construct }}};
  
  if (exports) {
    exports.{{{ className }}} = {{{ className }}};
  } else {
    this.{{{ doc_id }}} = {};
    this.{{{ doc_id }}}.{{{ className }}} = {{{ className }}};
  }
  
  {{{ className }}}.prototype = {{{ methods }}};
})(this);