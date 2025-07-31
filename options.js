
function rgbToHex(rgb) {
    // rgb can be "rgb(r, g, b)" or "rgba(r, g, b, a)"
    const result = rgb.match(/\d+/g);
    window.alert("RGB to Hex conversion:", rgb, "->", result);
    if (!result || result.length < 3) return rgb;
    return (
        "#" +
        ((1 << 24) + (parseInt(result[0]) << 16) + (parseInt(result[1]) << 8) + parseInt(result[2]))
            .toString(16)
            .slice(1)
            .toUpperCase()
    );
}


function clickColor(color) {
    const result = color.match(/\d+/g);
    const code = (
        "#" +
        ((1 << 24) + (parseInt(result[0]) << 16) + (parseInt(result[1]) << 8) + parseInt(result[2]))
            .toString(16)
            .slice(1)
            .toUpperCase()
    );

    for (s of document.querySelectorAll('span[class="c-block"][style="background-color: ' + code + '"]')) {
        s.click();
    }
    window.alert("All done!");
}

document.addEventListener('DOMContentLoaded', function () {

    const boxes = document.querySelectorAll("div.color-box")
    const btn = document.getElementById('run');

    boxes.forEach(box => {
        box.addEventListener('click', function () {
            // Change button color
            btn.style.backgroundColor = getComputedStyle(box).backgroundColor;

            // Reset ALL button borders
            boxes.forEach(b => {
                b.style.border = '4px solid white';
            });

            // Set border for the clicked box
            box.style.border = '4px solid black';
        });
    });

    btn.addEventListener('click', function () {
        if (btn.style.backgroundColor === '') {
            window.alert("Please select a color first.");
            return;
        }

        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: clickColor,
                args: [btn.style.backgroundColor],
            });
        });
    });
});

