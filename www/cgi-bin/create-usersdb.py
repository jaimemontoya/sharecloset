#modeled from https://github.com/pgbovine/csc210-fall-2015/blob/master/www/cgi-bin/lecture4-create-database.py

import sqlite3

#database called users.db
conn = sqlite3.connect('donors.db')
c = conn.cursor()

#varchar is a variable length character string
#making a table called 'users' inside donors.db
c.execute('create table users(username varchar(10) primary key, password varchar(20), zipcode int)')

#filling in db with users (maybe not do for real)
c.execute("insert into users values('stargirl27', 'elephant360!', 14627);")
c.execute("insert into users values('emichel2', 'password', 14086);")
c.execute("insert into users values('fish99', 'iheartbob6*', 14225);")
c.execute("insert into users values('bobram8', '92798@!', 14043);")


#table for items called 'items' inside donors.db
#note: no primary key because allowing multiple entries with the same username. 
c.execute('create table items(username varchar(10), type varchar(30), subtype varchar(30), quantity int)')

#filling in with a few items
c.execute("insert into items values('stargirl27','clothing','jeans',5);")
c.execute("insert into items values('emichel2','clothing','coats',2);")
c.execute("insert into items values('fish99','appliances','mixer',1);")
c.execute("insert into items values('bobram8','clothing','shoes',3);")
c.execute("insert into items values('stargirl27','toys','dress-up clothes',1);")
c.execute("insert into items values('bobram8','furniture','couch',1);")

conn.commit()
conn.close()
