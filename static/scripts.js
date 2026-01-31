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
    text_box.setAttribute("id", "user_text")

    // show some placeholder text so user knows that they can now enter information
    text_box.placeholder = "type here...";

    // append the new div and inputbox to the old div
    dropped_on.appendChild(new_div);
    new_div.appendChild(text_box);
}}

// need to load all of our users tables when logged in, also need a way to delete tables
function check_cookie() {
    if (document.cookie != `current_user=${""}`) {
        console.log("user detected");
    } else {
        console.log("no user found")
    }
        // lets also change the name of the h1 header to include the users name
}
// if user cookie has data, fetch all tables