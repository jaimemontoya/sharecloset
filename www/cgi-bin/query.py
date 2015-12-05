#!/usr/bin/env python
#!"C:\Python27\python.exe"
import sqlite3

# open an existing database file named 'people.db'
conn = sqlite3.connect('donors.db')
c = conn.cursor()

# run these SQL queries and print out their results to the terminal:
for r in c.execute('select * from users;'):
	print r
print

# for r in c.execute('select * from users order by age;'):
# 	print r
# print

# for r in c.execute('select * from users where age < 35;'):
# 	print r
# print

# for r in c.execute('select * from users where age < 35 order by name;'):
# 	print r
# print

conn.close()