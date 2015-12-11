#!"C:\Python27\python.exe"
#looking at other files from this project

#Some code from:
#https://github.com/pgbovine/csc210-fall-2015/blob/master/www/cgi-bin/lecture4-query-database.py
#https://github.com/pgbovine/csc210-fall-2015/blob/master/www/cgi-bin/lecture4.py

print "Content-Type: text/html"
print # don't forget the extra newline	


import cgi
form = cgi.FieldStorage()
obtainedUsername = form['usernameValue'].value

#obtainedUsername = 'stargirl27'

import sqlite3
conn = sqlite3.connect('donors.db')
c = conn.cursor()

#getting user's zipcode
userzip = 0
useraddress = ""
for r in c.execute('SELECT address, zipcode FROM users WHERE username = ?;',[obtainedUsername]):
	
	useraddress = r[0],
	userzip = r[1]

	#when also doing by item: make sure id's of user's item and org's item match...but there are multiple for each so maybe nested loops? 

import json
data = {}
data[0] = useraddress
data[1] = userzip

#getting organizations
counter = 2
#for r in c.execute('SELECT organizationname FROM organization WHERE zipcode = ?;',[userzip]):
#for r in c.execute('SELECT organizationname, organizationid FROM organization, item_organization, user_donation WHERE organizationid=item_organization.org_id AND organization.zipcode=? AND item_organization.org_itemid=user_donation.itemid  AND user_donation.username=?;',[userzip,obtainedUsername]):	
for r in c.execute('SELECT organizationname, organizationid, address, zipcode FROM organization, item_organization, user_donation WHERE organizationid=item_organization.org_id AND item_organization.org_itemid=user_donation.itemid  AND user_donation.username=?;',[obtainedUsername]):	
	data[counter] = {"org_name": r[0],
	 "org_id":r[1],
	 "org_address": r[2],
	 "org_zip": r[3]
	 } #or should it be r? 
	counter += 1

print json.dumps(data)

