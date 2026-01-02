chrome.runtime.onMessage.addListener((message) => {
    if (message.type === 'PING') {
        console.log('Received PING from popup.')
    }
})
