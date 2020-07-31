var button = document.getElementById('connect');
button.addEventListener('click', function () {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var data = tabs[0].url;
        chrome.tabs.sendMessage(tabs[0].id, {data: data}, function(response) {
            console.log(response);
        });
    });
});