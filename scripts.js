// on dragging an object
function dragstartHandler(ev) {
    // figure out what the object is so we know what to do when we drop it
    ev.dataTransfer.setData("text/plain", ev.target.src);
    console.log(ev.target.id)
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

    // set up some ids for the newly created thingies
    text_box.setAttribute("id", "user_text")

    // show some placeholder text so user knows that they can now enter information
    text_box.placeholder = "type here...";

    // append the new div and inputbox to the old div
    dropped_on.appendChild(new_div);
    new_div.appendChild(text_box);
}}


// right now theres a bug where if we drag ANYTHING onto these boxes we get a text box, this is not the intention i had