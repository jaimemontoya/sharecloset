#!/usr/bin/env python

print "Content-Type: text/html"
print # don't forget the extra newline	

import json
data = {'name':'Kasun', 'address':'columbo','age': '29'}
data['myName'] = 'Jaime'
data['myLastName'] = 'Montoya'
print json.dumps(data)
