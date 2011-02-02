# -*- coding: utf-8 -*-

# TODO: make this a standalone script
# TODO: implement filters
# TODO: implement fulfillment for any doc & dependency resolution

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
    if os.path.exists('edocs/require.json'):
      with open('edocs/require.json') as f:
        edocs = json.load(f)
      if len(edocs) > 0:
        if not os.path.exists('./edocs/docs'):
          os.mkdir('./edocs/docs')
      for edoc, value in edocs.items():
        doc = self.db.open_doc(edoc)
        with open('./edocs/docs/%s.json' % edoc, 'w') as f:
          json.dump(doc, f, indent=2, sort_keys=True)

def hook(path, hooktype, **kwarg):
  if hooktype == "pre-push":
    fulfillment = Fulfillment()
    fulfillment.run()