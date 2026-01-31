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

@app.route("/register", methods=["GET"])
def register_load():
    return render_template("register.html")

@app.route("/login", methods=["GET"])
def login_load():
    return render_template("login.html")

# make api endpoints
##########################

@app.route("/register_user", methods=["POST"])
def register():
    user = request.get_json()

    cur.execute(f"SELECT * FROM users WHERE username = '{user['username']}'")
    rows = cur.fetchall()
    user_fixed = tuple(user.values())

    for x in rows:
        if user_fixed == x[1:]:
            print("user already exists")
            return {"status": "exists"}, 401

    else:
        password = user["password"]
        bytes = password.encode("utf-8")
        salt = bcrypt.gensalt()
        hash = bcrypt.hashpw(bytes, salt)

        cur.execute(
            "INSERT INTO users (username, password) VALUES (?, ?)",
            (user["username"], hash),
        )
        con.commit()

        for row in cur.execute("""SELECT * FROM  users"""):
            print(row)

        return {"status": "ok"}, 200

@app.route("/login_user", methods=["POST"])
def login():
    login_real = request.get_json()

    cur.execute("SELECT * FROM users WHERE username = ?", (login_real["username"],))
    rows = cur.fetchall()
    user_fixed = tuple(login_real.values())

    for x in rows:
        if user_fixed[0] == x[1] and bcrypt.checkpw(
            user_fixed[1].encode("utf-8"), x[2]
        ):
            current_user = x[1]
            print("user logged in")
            return {"status": "ok"}, 200
    else:
        return (
            jsonify({"status": "error", "message": "Invalid username or password"}),
            401,
        )

# make a way to keep track of our current logged in user
@app.route("/current_user", methods=["POST"])
def current_user():

    return {"status": "ok"}, 200

# make this a table where we store the data for our "to do" table, associate all the data with the current logged in user.
# repeat this table 3 times for our other ones
@app.route("/todo_table", methods=["POST"])
def store_todo():
    
    return {"status": "ok"}, 200

# table for storing "in progress" tasks
@app.route("/in_progress_table", methods=["POST"])
def store_in_progress():
    
    return {"status": "ok"}, 200

# table for storing "done" tasks
@app.route("/done_table", methods=["POST"])
def store_done():
    
    return {"status": "ok"}, 200

# fetch all 3 tables saved data for our current user and return it to the front end for processing
@app.route("/fetch_tables", methods=["POST"])
def fetch_tables():
    
    return {"status": "ok"}, 200

# what to do on running the program
##########################
if __name__ == "__main__":
    app.run(debug=True)
