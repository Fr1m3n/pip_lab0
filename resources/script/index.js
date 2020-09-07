let x_field = $("x-input");
let y_field = $("y-input");
let r_group = document.getElementsByClassName("form-radio");

function $(id) {
    return document.getElementById(id);
}

function onFormSubmit(e) {
    let xhr = new XMLHttpRequest();
    e.preventDefault();
    xhr.open("POST", "php/check.php");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            applyServerResponse(xhr.responseText);
        }
    }

    let formData = new FormData();
    formData.append("value_x", x_field.value);
    formData.append("value_y", y_field.value);
    formData.append("value_r", getRValue());
    xhr.send(formData);
}

function getTable() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "php/table.php");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            applyServerResponse(xhr.responseText);
        }
    }
    xhr.send();
}

function getRValue() {
    for (let i = 0; i < r_group.length; i++) {
        let radioButton = r_group.item(i).childNodes.item(1);
        if (radioButton.checked) {
            return radioButton.value;
        }
    }
}

function resetTable(e) {
    let xhr = new XMLHttpRequest();
    e.preventDefault();
    xhr.open("GET", "php/drop.php");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            applyServerResponse(xhr.responseText);
        }
    }
    xhr.send();
}

function applyServerResponse(response) {
    $("result-table").innerHTML = response;
}

document.addEventListener("DOMContentLoaded", function () {
    $("submit").addEventListener("click", onFormSubmit);
    $("reset").addEventListener("click", resetTable);
    getTable();
});