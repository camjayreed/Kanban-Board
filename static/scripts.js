
let uuid = self.crypto.randomUUID();

// on dragging an object
function dragstartHandler(ev) {
    // figure out what the object is so we know what to do when we drop it
    ev.dataTransfer.setData("text/plain", ev.target.src);
    console.log(ev.target.id)

    // on drag get current logged in user to append to our text box div
        dragged_obj = ev.target.id
    
    return dragged_obj
}

// on dragging over an object
function dragoverHandler(ev) {
    // maybe highlight the field were dropping into
    ev.preventDefault();
}

// on dropping an object
function dropHandler(ev) {

// check if object dropped is == to any of our createable objects, if not dont make anything at all
if (dragged_obj == "text_drag") {
    // crete div and input field
    const new_div = document.createElement("div");
    const text_box = document.createElement("textarea");
    const dropped_on = ev.target
    // make a little box that says the name of the user

    // set up some ids for the newly created thingies
    new_div.setAttribute("class", "card")
    new_div.setAttribute("data-card-id", `${uuid}`)
    text_box.setAttribute("class", "user_text")

    // show some placeholder text so user knows that they can now enter information
    text_box.placeholder = "type here...";

    // append the new div and inputbox to the old div
    dropped_on.appendChild(new_div);
    new_div.appendChild(text_box);
}}

// function for checking if a cookie exists
// (i stole this mwahahahaha)
function get_cookie_name(name) {
    const cookies = document.cookie.split("; ");

    for (const cookie of cookies) {
        const [key, value] = cookie.split("=");
        if (key === name) {
            return value;
        }
    }
    return null;
}

// stole this off w3schools
// pass in name of cookie, get value
function get_cookie_value(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// need to load all of our users tables when logged in, also need a way to delete tables
function check_cookie() {
    if (get_cookie_name("current_user")) {
        console.log("user detected");
        document.getElementById("h1").innerText = `${get_cookie_value("current_user")}'s scuffed kanban board`

    } else {
        console.log("no user found")
    }
        // lets also change the name of the h1 header to include the users name
}
// if user cookie has data, fetch all tables

function save_tables() {
    // on runnng this we should run through all text boxes of each table individually, then append all boxes within a table to a list
    // this way we have a way to tell what divs go to what box, for later display
}

function fetch_tables() {
    // placeholder
}