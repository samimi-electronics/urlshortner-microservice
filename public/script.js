// Constants
const inputURL = document.getElementById('url_input')
const submitBtn = document.getElementById('submitBtn')
const errorMsg = document.querySelector('.errorMsg')

// Get the shortened URL from the database
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

/*
* TODO: Show shortened url to user
*  */
// Function to display response to user
const showResponse = (res) => {
    const baseApiUrl = 'api/shorturl'
    if (res.status === 400 || res.status === 404 || res.status === 500) {
        console.log(res.error)
        inputURL.className += ' inputError'
        errorMsg.style.display = 'block'
    } else {
        console.log(`${window.location.href}${baseApiUrl}/${res.short_url}`)
        errorMsg.style.display = ''
    }
}

submitBtn.addEventListener('click', async (e) => {
    // Prevents default behavior: Redirect to response
    e.preventDefault()
    const responseData = await getUrl(inputURL.value);
    console.log(responseData)
    showResponse(responseData)
})

inputURL.addEventListener('input', () => {
    inputURL.className = ''
    errorMsg.style.display = 'none'
})
