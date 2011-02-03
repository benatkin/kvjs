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
    if os.path.exists('kvjs.json'):
      with open('kvjs.json') as f:
        edocs = json.load(f)['edocs']
      if len(edocs) > 0:
        if not os.path.exists('./edocs'):
          os.mkdir('./edocs')
        for edoc, value in edocs.items():
          doc = self.db.open_doc(edoc)
          for field in ['_id', '_rev', 'couchapp']:
            del doc[field]
          with open('./edocs/%s.json' % edoc, 'w') as f:
            json.dump(doc, f, indent=2, sort_keys=True)

if __name__ == '__main__':
  fulfillment = Fulfillment()
  fulfillment.run()