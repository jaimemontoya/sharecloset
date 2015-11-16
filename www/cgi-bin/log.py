#!/usr/bin/env python
# print the http header
#stuff from lecture4.py

#this is for sign-up! 

import cgi
form = cgi.FieldStorage()

requestedUser = form['usernameValue'].value
requestedPass = form['passwordValue'].value 

import sqlite3
conn = sqlite3.connect('donors.db')
c = conn.cursor()

print "Content-Type: text/html"
print # don't forget the extra newline	

import json

#data = "hello"
#print json.dumps("hello")
data = {}
#for r in c.execute('select username from users where username="emichel2";'):
#	data = r
#data['myUsername'] = "Not found"

for r in c.execute('select * from users where username=? AND password=?;',[requestedUser,requestedPass]):	
	name = r[0]

	data['myUsername'] = name
	print json.dumps(data)

conn.commit()
conn.close()
