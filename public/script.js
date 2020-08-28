// Constants
const inputURL = document.getElementById('url_input')
const submitBtn = document.getElementById('submitBtn')
const errorMsg = document.querySelector('.errorMsg')
const newUrlSection = document.querySelector('.newUrlSection')
const newUrl = document.querySelector('.newUrl')

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

// Function to display response to user
const showResponse = (res) => {
    const baseApiUrl = 'api/shorturl'
    const shortURL = `${window.location.href}${baseApiUrl}/${res.short_url}`
    if (res.status === 400 || res.status === 404 || res.status === 500) {
        console.log(res.error)
        inputURL.className += ' inputError'
        errorMsg.style.display = 'block'
        newUrlSection.style.opacity = '0'
        newUrlSection.style.display = 'none'
    } else {
        console.log(shortURL)
        errorMsg.style.display = ''
        newUrl.href = shortURL
        newUrl.innerHTML = shortURL
        newUrlSection.style.display = 'block'
        newUrlSection.style.opacity = '1'
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

newUrl.addEventListener('click', (e) => {
    e.preventDefault()
    window.open(newUrl.href, '_blank')
})
