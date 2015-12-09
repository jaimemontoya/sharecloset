#!"C:\Python27\python.exe"

#looking at other files from this project

print "Content-Type: text/html"
print #don't forget the extra newline	

import cgi
form = cgi.FieldStorage()
obtainedUsername = form['usernameValue'].value
obtainedOrgId = form['organizationidValue'].value

import sqlite3
conn = sqlite3.connect('donors.db')
c = conn.cursor()


import json
data = {}

#***for now just getting matches. later get other stuff about organization (mission statement, address, zipcode)
#data[0]["org_site"]
for r in c.execute('SELECT organizationname, photo, site, address, zipcode FROM organization WHERE organizationid = ?;',[obtainedOrgId]):
	data[0] = {"org_name": r[0], "org_photo": r[1], "org_site":r[2], "org_address": r[3], "org_zip": r[4]}
#	data[1] = {"org_photo": r[1]}
counter = 1
for r in c.execute('SELECT	itemname FROM item,user_donation,item_organization WHERE user_donation.username=? AND item_organization.org_id=? \
	AND user_donation.itemid=item_organization.org_itemid AND item.itemid=user_donation.itemid;',[obtainedUsername,obtainedOrgId]): 
	data[counter] = {"itemname": r[0]} #or should it be r? 
	counter += 1
#data[0] = {"a": "hello"}
#data[1] = {"a": "world"}
print json.dumps(data)

#user_donation.username=obtainedUsername
#item_organization.org_id=obtainedOrgId
#user_donation.itemid=item_organization.org_itemid
#item.itemid = user_dontation.itemid

#AND organization.zipcode=? AND item_organization.org_itemid=user_donation.itemid  AND user_donation.username=?;',[userzip,obtainedUsername]):


#all creating table lines for reference
#c.execute('create table users(username varchar(10) primary key, password varchar(20), zipcode int)')
#c.execute('CREATE TABLE item(itemid integer primary key, itemname varchar(30), itemtypeid integer)')
#c.execute('CREATE TABLE type(typeid integer primary key, typename varchar(20))')
#c.execute('CREATE TABLE user_donation(user_donationsid integer primary key autoincrement, username varchar(10), itemid integer, description varchar(100), quantity integer, timestamp not null default current_timestamp)')
#c.execute('CREATE TABLE organization(organizationid integer primary key, organizationname varchar(30), zipcode integer)')
#c.execute('CREATE TABLE item_organization(gen_id integer primary key autoincrement, org_id integer, org_itemid integer)')






