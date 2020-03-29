"use strict";

let form = document.getElementById("form"),
    number = document.getElementById("number"),
    result = document.getElementById("result");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    result.textContent = "Loading...";

    let n = number.value,
        url = `/double?number=${n}`;

    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) return result.textContent = data.error;
            result.textContent = data.result;
        });
    });
});