# imports
##########################
from flask import Flask, render_template, request, jsonify, session, redirect, url_for
from flask_cors import CORS
import sqlite3, json, os, bcrypt, secrets

# app setup
##########################
app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(
    BASE_DIR,
    "database.db",
)

print("USING DB FILE:", DB_PATH)

con = sqlite3.connect(DB_PATH, check_same_thread=False)
cur = con.cursor()

# make db tables
##########################

# table for storing users
cur.execute(
    """CREATE TABLE IF NOT EXISTS users
        (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, username VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL)"""
)

# table for "to do" table data
cur.execute(
    """CREATE TABLE IF NOT EXISTS todo_table
        (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, username VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL)"""
)

# table for "in progress" table data
cur.execute(
    """CREATE TABLE IF NOT EXISTS in_progress_table
        (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, username VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL)"""
)

# table for "done" table data
cur.execute(
    """CREATE TABLE IF NOT EXISTS done_table
        (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, username VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL)"""
)

# make api endpoints
##########################

# make a way to keep track of our current logged in user
@app.route("/placeholder", methods=["POST"])
def placeholder():
    pass

# make this a table where we store the data for our "to do" table, associate all the data with the current logged in user.
# repeat this table 3 times for our other ones
@app.route("/placeholder", methods=["POST"])
def placeholder():
    pass

# table for storing "in progress" tasks
@app.route("/placeholder", methods=["POST"])
def placeholder():
    pass

# table for storing "done" tasks
@app.route("/placeholder", methods=["POST"])
def placeholder():
    pass

# fetch all 3 tables saved data for our current user and return it to the front end for processing
@app.route("/placeholder", methods=["POST"])
def placeholder():
    pass


# what to do on running the program
##########################
if __name__ == "__main__":
    app.run(debug=True)
