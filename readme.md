kvjs
====

**NOTE**: This project includes some custom python scripting for generating parts of the design document from regular documents within the `_docs` directory. This readme includes special instructions for making sure this happens.

Getting Started
---------------

1.  Install this [couchapp](http://couchapp.org/)
    a.  Get a couch from [CouchOne](http://couchone.com/) or [Cloudant](http://cloudant.com/) or [set up CouchDB on your desktop or server](http://couchone.com/get)
    b.  Install `couchapp` by running `pip install couchapp` or `easy_install couchapp`
    c.  Clone this repo
    d.  Create a .couchapprc in the root directory of this repo
    e.  run `couchapp push`
2.  Edit the documents (the design document and the documents under \_docs) and run `couchapp push` to update them.
3.  Run `python fulfillment.py` to update documents that are automatically processed or are generated from other documents. Then, push again. Some changes, especially changing the script renderer, require running `couchapp push` and `python fulfillment.py` more than once.

Sample `.couchapprc`:
    {
      "env": {
        "default": {
          "db": "https://bat:cleverpassword@bat.cloudant.com/kvjs"
        }
      }
    }

TODO
----

### action items

* implement separate page view and data view
* add Showdown
* add dustjs
* add google caja
* add rewrites
* add markdown doc
* make renderer use specified template and markdown body
* use *lib* for modules instead of edocs

### areas of focus

* ...
* get a proper build system going

I [avoid yammering about my uber-clever plans before I attempt them](http://sivers.org/zipit "one of my favorite articles"), but I have other todos. If you're curious, find me online. I may tell you some of them. :)

DocEnv (draft)
--------------

DocEnv builds an environment around a document. There are also app
environments. They contain the data, along with other objects. The
document data would be at `doc.data` where doc is the DocEnv. The 
data might be wrapped at some point for easy traversal, and if it
is, the original data might be at `doc.raw`. It might be cleared
out if it gets invalidated and have to be regenerated.

The other types of objects might include edocs (a mechanism for
updating embedded documents), page, site, script, and template.

There will also be circular links to the design doc's AppEnv and
the DocEnv of the current doc. The AppEnv will also contain
references to other docs under `app.docs`, and the DocEnv of other
docs, that aren't current, will contain links to the AppEnv.

My intent is for the AppEnv to be the entry point most of the time.

The AppEnv on the client should be allowed to get out of sync with
the AppEnv on the server. It should keep track of what needs to be
updated on the server, preferably in a couchy way. It should 
provide CouchDB's interface with JavaScript methods. Finally, it 
should keep some uuids handy. :)

A DocEnv should be created by the AppEnv. Perhaps an AppEnv should
have a prototype for creating DocEnvs.

Annotations, Stamping, Items (draft)
------------------------------------

Some annotations, like those in Activity Streams format, could be built in. Others could be added later. Perhaps the ones added later would need to be specified in a metadata property for every document it's added to.

LICENSE
-------

Copyright (c) 2011 Ben Atkin. Licensed under the terms of the MIT license.
