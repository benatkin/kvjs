# -*- coding: utf-8 -*-

# TODO: make this a standalone script
# TODO: implement filters
# TODO: implement fulfillment for non-design docs & dependency resolution

import logging
import os
import json

from couchapp.config import Config
from couchapp.localdoc import document

logger = logging.getLogger(__name__)

class Fulfillment(object):
  def __init__(self):
    self.conf = Config()
    self.db = self.conf.get_dbs()[0]
    
  def run(self):
    self.build_edocs()
    for doc_id in os.listdir('_docs'):
      self.build_js(doc_id)
  
  def build_edocs(self, doc_id=None):
    kvjs = self.get_local_kvjs(doc_id)
    edocs = kvjs['edocs']
    if len(edocs) > 0:
      if not os.path.exists(self.doc_path('edocs', doc_id)):
        os.mkdir(self.doc_path('edocs', doc_id))
      for edoc_id, edoc_opts in edocs.items():
        edoc = self.db.open_doc(edoc_id)
        for field in ['_id', '_rev', 'couchapp']:
          if field in edoc:
            if field not in ('_rev', 'edocs'):
              edoc['edoc_' + field] = edoc[field];
            del edoc[field]
        self.write_if_changed(self.doc_path('edocs/%s.json' % edoc_id, doc_id), edoc)
  
  def build_js(self, doc_id=None):
    kvjs = self.get_local_kvjs(doc_id)
    if kvjs.has_key('js_class') and kvjs.get('build_module', False):
      resp = self.db.res.get('/_design/kvjs/_show/script/%s' % doc_id)
      self.write_if_changed(self.doc_path('js_module.js', doc_id), resp.body_string())
      resp.close()
  
  def write_if_changed(self, pth, val):
    verb = 'Created'
    if os.path.exists(pth):
      verb = 'Updated'
      with open(pth) as f:
        if type(val) == str:
          if val == f.read():
            return False
        else:
          if val == json.load(f):
            return False
    with open(pth, 'w') as f:
      if type(val) == str:
        f.write(val)
      else:
        json.dump(val, f, indent=2, sort_keys=True)
    print '%s %s' % (verb, pth)
  
  def doc_path(self, path, doc_id=None):
    if doc_id is None:
      return path
    else:
      return "_docs/%s/%s" % (doc_id, path)
  
  def get_local_kvjs(self, doc_id):
    kvjs_path = self.doc_path('kvjs.json', doc_id)
    if os.path.exists(kvjs_path):
      with open(kvjs_path) as f:
        return json.load(f)
    return {}

if __name__ == '__main__':
  fulfillment = Fulfillment()
  fulfillment.run()