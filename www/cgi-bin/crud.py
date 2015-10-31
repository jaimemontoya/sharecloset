#!/usr/bin/env python
# print the http header
print "Content-Type: text/html"
print # don't forget the extra newline

import cgi
form = cgi.FieldStorage()
usernameValue = form['usernameValue'].value
import json
data = {}
data['myUsername'] = usernameValue
print json.dumps(data)