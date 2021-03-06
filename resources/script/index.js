let r_group = document.getElementsByClassName("form-radio");

const MAX_DECIMAL_LENGTH = 8;

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
    formData.append("value_x", $("x-input").value.replace(/,/, "."));
    formData.append("value_y", $("y-input").value.replace(/,/, "."));
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

function checkXInput() {
    let xField = $("x-input");
    if (xField.value.match(/^-?\d+[.,]?\d*$/) != null && xField.value.length <= MAX_DECIMAL_LENGTH) {
        let xValue = parseFloat(xField.value);
        return xValue >= -3.0 && xValue <= 3.0;
    } else {
        return false;
    }
}


function checkYInput() {
    // if (isNaN(yValue)) {
    //     console.log("y field isn`t number");
    //     return false;
    // }
    let yField = $("y-input");
    if (yField.value.match(/^-?\d+[.,]?\d*$/).length != null && yField.value.length <= MAX_DECIMAL_LENGTH) {
        let yValue = parseFloat(yField.value);
        return yValue >= -3.0 && yValue <= 3.0;
    } else {
        return false;
    }

}

function checkInput() {
    let submitButton = $("submit");
    if (checkXInput() && checkYInput()) {
        submitButton.classList.remove("disabled-button");
        submitButton.classList.add("enabled-button");
        submitButton.disabled = false;
        $("error-message").style.visibility = "hidden";
    } else {
        submitButton.classList.remove("enabled-button");
        submitButton.classList.add("disabled-button");
        submitButton.disabled = true;
        $("error-message").style.visibility = "visible";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    $("submit").addEventListener("click", onFormSubmit);
    $("reset").addEventListener("click", resetTable);
    $("x-input").addEventListener("input", checkInput);
    $("y-input").addEventListener("input", checkInput);
    getTable();
    checkInput();
});