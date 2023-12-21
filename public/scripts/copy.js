function copyToClipboard(element, buttonId) {
    const text = document.querySelector(element).innerText;
    navigator.clipboard.writeText(text).then(() => {
    // Find the button that was clicked using its ID
    const copyButton = document.getElementById(buttonId);
    copyButton.innerHTML = 'Copied!';

    // Reset the button text back to "Copy" after a few seconds
    setTimeout(() => {
        copyButton.innerHTML = 'Copy';
    }, 3000); // Reset after 3 seconds
    }).catch(err => {
    console.error('Failed to copy text: ', err);
    });
}