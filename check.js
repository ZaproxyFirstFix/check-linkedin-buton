console.log("Running check Reload.js");

let found = false;

// Function to check the page after the dialogue opens
// Function to handle unchecking the checkbox
function uncheckCheckbox() {
    // Find the checkbox and click it to uncheck

    const checkbox = document.querySelector("#follow-company-checkbox");
    if (checkbox && checkbox.checked) {
      checkbox.click();  // Click to uncheck
      found = true
      console.log('Checkbox clicked to uncheck');
    } else if (checkbox) {
      console.log('Checkbox was already unchecked');
    } else {
      console.log('Checkbox not found');
    }
}  
  // MutationObserver to detect DOM changes (e.g., dialogue opening)
  const observer = new MutationObserver((mutationsList) => {
    if (found === true) {
        console.log('what the hell?')
        return;
    }

    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            // If a new element contains the checkbox, handle it
            const checkbox = node.querySelector("#follow-company-checkbox");
            if (checkbox) {
              console.log('New checkbox found, attempting to uncheck...');
              uncheckCheckbox();
            }
          }
        });
      }
    }
  });


observer.observe(document.body, {
  childList: true,       // Watch for direct child additions/removals
  subtree: true          // Watch the entire subtree (all descendant elements)
});

// Initially check for the checkbox in case it's already present on page load
window.addEventListener('load', () => {
    console.log('Page fully loaded, starting the checkbox uncheck process');
    
    // First, check if the checkbox is already present
    uncheckCheckbox();
    
    // Set up the observer to catch dynamically added checkboxes
    observeDomChanges();
  });


// Add event listener to the "Submit application" button
document.addEventListener('click', function (e) {
    const submitButton = e.target.closest('button[aria-label="Submit application"]');
    
    if (submitButton) {
      console.log('Submit application button clicked');
      found = false;
    }
});