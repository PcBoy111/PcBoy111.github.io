// https://stackoverflow.com/a/987376
function select_text(element) {
    var doc = document
        , text = doc.getElementById(element)
        , range, selection
    ;    
    if (doc.body.createTextRange) {
        range = document.body.createTextRange();
        range.moveToElementText(text);
        range.select();
    } else if (window.getSelection) {
        selection = window.getSelection();        
        range = document.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}

function item(index) {
    return $("#li" + index);
}

function update_command() {
    var command = "!vote";
    
    $(".items li").each(function(index) {
        if (item(index).val()) {
            command += " " + item(index).val() + ";";
        }
    });
    
    $(".command").val(command);
}

function save_storage() {
    $(".items li").each(function(index) {
        localStorage.setItem("li" + index, item(index).val());
    });
}

function load_storage() {
    $(".items li").each(function(index) {
        item(index).val(localStorage.getItem("li" + index));
    });
}

function swap_values(e1, e2) {
    e2_value = e2.val();
    e2.val(e1.val());
    e1.val(e2_value);
}

function handle_swap(event) {
    var e = $("#" + event.target.id),
    index = parseInt(event.target.id.slice(-1)),
    next, next_value;
    
    // Arrow down
    if (event.keyCode == 40) {
        if (index >= 9)
            return
        
        next = item(index + 1);
        swap_values(e, next);
        next.focus();
        update_command();
    }
    // Arrow up
    else if (event.keyCode == 38) {
        if (index <= 0)
            return
        
        next = item(index - 1);
        swap_values(e, next);
        next.focus();
        update_command();
    }
}

$(document).ready(function() {
    load_storage();
    update_command();
    
    $(".items").on("input", update_command);
    $(".items").on("focusout", save_storage);
    $(".items").on("keyup", handle_swap);
    
    $("#copy").on("click", function() {
        $(".command").select();
        document.execCommand("copy");
        save_storage();
    });
});

