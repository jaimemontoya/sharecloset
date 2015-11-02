#!"C:\Python27\python.exe"
#!/usr/bin/env python
# print the http header
# print "Content-Type: text/html"
# print # don't forget the extra newline

import cgi
form = cgi.FieldStorage()
# usernameValue = form['usernameValue'].value


import cgitb
cgitb.enable()


usernameValue = form['user_name'].value
passwordValue = form['user_password'].value
zipcodeValue = form['user_zip'].value

import json
data = {}
data['myUsername'] = usernameValue
data['myPassword'] = passwordValue
data['myZipcode'] = zipcodeValue
print json.dumps(data)

# insert new user data into the database
import sqlite3

conn = sqlite3.connect('donors.db')
c = conn.cursor()

c.execute('insert into users values (?, ?, ?)', (user_name, user_password, user_zip))
conn.commit()
conn.close()
