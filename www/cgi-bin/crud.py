#!"C:\Python27\python.exe"
# print the http header
print "Content-Type: text/html"
print # don't forget the extra newline

import cgi
form = cgi.FieldStorage()
userValue = form['usernameValue'].value
passwordVal = form['passwordValue'].value 
zipVal = form['zipcodeValue'].value

import json
data = {}
data['myUsername'] = userValue
data['myPassword'] = passwordVal
data['myZip'] = zipVal
print json.dumps(data)
