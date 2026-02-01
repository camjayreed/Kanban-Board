
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

        fetch_tables()

    } else {
        console.log("no user found")
    }
        // lets also change the name of the h1 header to include the users name
}
// if user cookie has data, fetch all tables

// i pretty much thought of this approach, but needed gpt to help me implement it
// it gave me the advice to use classes and data-columns for the tables.
// it also wrote how to query them, i definitly dont fully understand the approach so i will look into it after my timer is finished (im a chud :{ )
function save_tables() {

    const todo_text = [];
    const doing_text = [];
    const done_text = [];

    // basically take all the text boxes from our table and save them to an array
    document.querySelector(".column[data-column='todo']").querySelectorAll(".user_text").forEach(t => todo_text.push(t.value));
    
    // grab the doing table
    document.querySelector(".column[data-column='doing']").querySelectorAll(".user_text").forEach(t => doing_text.push(t.value));

    // grab the done table
    document.querySelector(".column[data-column='done']").querySelectorAll(".user_text").forEach(t => done_text.push(t.value));


    const user_tables = [todo_text, [doing_text],[done_text]]

    console.log(user_tables)
    // so after collecting all the tables, we need to merge them into 1 big sorted nested array for later parsing
    // we also need to include the username of the individual whos table it is so we know who to store and pull tables from

    fetch("http://127.0.0.1:5000/save_tables", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user_tables, window.username),
    });
}

function fetch_tables() {

    // need to do an api fetch to get users tabledata

    // placeholder data to test
    //const todo_text = ['cameron', 'hates', 'monkeys'];
    //const doing_text = ['caenen', 'is', 'mean'];
    //const done_text = ['barrett', 'loves', 'monkeys and bananas'];

    const user_tables = [todo_text, doing_text, done_text];

    user_tables.forEach((tables, index) => {
        tables.forEach(text => {
            if (index === 0) {
                const new_div = document.createElement("div");
                const text_box = document.createElement("textarea");

                new_div.setAttribute("class", "card")
                new_div.setAttribute("data-card-id", `${uuid}`)
                text_box.setAttribute("class", "user_text")

                text_box.innerText = `${text}`;

                kanban_todo.appendChild(new_div);
                new_div.appendChild(text_box);

            } 
            if (index === 1) {
                const new_div = document.createElement("div");
                const text_box = document.createElement("textarea");

                new_div.setAttribute("class", "card")
                new_div.setAttribute("data-card-id", `${uuid}`)
                text_box.setAttribute("class", "user_text")

                text_box.innerText = `${text}`;

                kanban_doing.appendChild(new_div);
                new_div.appendChild(text_box);

            }
            if (index === 2) {
                const new_div = document.createElement("div");
                const text_box = document.createElement("textarea");

                new_div.setAttribute("class", "card")
                new_div.setAttribute("data-card-id", `${uuid}`)
                text_box.setAttribute("class", "user_text")

                text_box.innerText = `${text}`;

                kanban_done.appendChild(new_div);
                new_div.appendChild(text_box);

            }
        
    })});

}

document.getElementById("test_button").addEventListener("click", save_tables)