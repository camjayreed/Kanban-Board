// on dragging an object
function dragstartHandler(ev) {
    // figure out what the object is so we know what to do when we drop it
    ev.dataTransfer.setData("text/plain", ev.target.src);

}

// on dragging over an object
function dragoverHandler(ev) {
    // maybe highlight the field were dropping into
    ev.preventDefault();
}

// on dropping an object
function dropHandler(ev) {
    // crete div and input field
    const new_div = document.createElement("div");
    const text_box = document.createElement("input");
    const dropped_on = ev.target

    // show some placeholder text so user knows that they can now enter information
    text_box.placeholder = "type here...";

    // get the id of the thing we dragged too, then append to that id

    // append the new div and inputbox to the old div
    dropped_on.appendChild(new_div);
    new_div.appendChild(text_box);
}