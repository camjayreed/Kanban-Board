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
        (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, username VARCHAR(255) NOT NULL, text_info TEXT)"""
)

# table for "in progress" table data
cur.execute(
    """CREATE TABLE IF NOT EXISTS todo_table
        (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, username VARCHAR(255) NOT NULL, text_info TEXT)"""
)

# table for "done" table data
cur.execute(
    """CREATE TABLE IF NOT EXISTS todo_table
        (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, username VARCHAR(255) NOT NULL, text_info TEXT)"""
)

# Make routes to html pages
##########################

@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")

@app.route("/login", methods=["GET"])
def login():
    return render_template("login.html")

@app.route("/register", methods=["GET"])
def register():
    return render_template("register.html")

# make api endpoints
##########################

# make a way to keep track of our current logged in user
@app.route("/current_user", methods=["POST"])
def current_user():
    pass

# make this a table where we store the data for our "to do" table, associate all the data with the current logged in user.
# repeat this table 3 times for our other ones
@app.route("/todo_table", methods=["POST"])
def store_todo():
    pass

# table for storing "in progress" tasks
@app.route("/in_progress_table", methods=["POST"])
def store_in_progress():
    pass

# table for storing "done" tasks
@app.route("/done_table", methods=["POST"])
def store_done():
    pass

# fetch all 3 tables saved data for our current user and return it to the front end for processing
@app.route("/fetch_tables", methods=["POST"])
def fetch_tables():
    pass


# what to do on running the program
##########################
if __name__ == "__main__":
    app.run(debug=True)
