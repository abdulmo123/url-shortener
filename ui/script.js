const submitBtn = document.querySelector('button[type="submit"]');

let state = {
    resultUrl: ''
}

submitBtn.addEventListener('click', async (e) => {
    e.preventDefault(); // Stops the page refresh

    console.log('FORM SUBMIT INTERCEPTED');

    const urlInput = document.querySelector('input:not([readonly])')
    console.log('url ==>', urlInput.value);
    const obj = { url: urlInput.value }


    console.log('obj == ', obj)
    try {
        const response = await fetch("http://localhost:8080/url/gen-short-url", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        });

        const data = await response.json();
        console.log('Data captured:', data);

        setState(() => {
            state.resultUrl = data.short_url;
        })

    } catch (error) {
        console.error('Error:', error);
    }
});

function setState(callback) {
    callback();
    renderDOM();
}

function renderDOM() {
    var resultUrlInput = document.querySelector('input.result');
    resultUrlInput.value = state.resultUrl;
}

const copyGeneratedUrlToClipboard = async () => {
    var resultUrlInput = document.querySelector('input.result');
    console.log('resultUrlInput.value ==>', resultUrlInput.value);
    try {
        await navigator.clipboard.writeText(resultUrlInput.value);
        console.log('Content copied to clipboard');
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
}