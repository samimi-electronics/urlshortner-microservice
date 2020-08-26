const inputURL = document.getElementById('url_input')
const submitBtn = document.getElementById('submitBtn')

const getUrl = async (url) => {
    const response = await fetch('/api/shorturl/new', {
        method: 'POST',
        mode: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            url: inputURL.value
        })
    })
    return response.json()
}

const showResponse = (res) => {
    const baseApiUrl = 'api/shorturl'
    if (res.status === 400 || res.status === 404 || res.status === 500) {
        console.log(res.error)
        inputURL.className += ' inputError'
    } else {
        console.log(`${window.location.href}${baseApiUrl}/${res.short_url}`)
    }
}

submitBtn.addEventListener('click', async (e) => {
    e.preventDefault()
    const responseData = await getUrl(inputURL.value);
    console.log(responseData)
    showResponse(responseData)
})
