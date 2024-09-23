console.log("Running check.js");

// Get the checkbox element and check if it exists
const checkbox = document.querySelector("#check-me input[type='checkbox']");

if (checkbox) {
    checkbox.click();
    console.log("Checkbox element found and clicked.");
} else {
    console.log("Checkbox element not found.");
}