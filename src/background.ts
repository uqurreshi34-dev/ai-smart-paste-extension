chrome.runtime.onMessage.addListener(
    (message, _sender, sendResponse) => {
        if (message.type !== 'CAPTURE_VISIBLE_TAB') return

        chrome.windows.getCurrent((window) => {
            if (!window?.id) {
                sendResponse({ error: 'No active window' })
                return
            }

            chrome.tabs.captureVisibleTab(
                window.id,
                { format: 'png' },
                (dataUrl) => {
                    if (chrome.runtime.lastError) {
                        sendResponse({ error: chrome.runtime.lastError.message })
                        return
                    }

                    sendResponse({ screenshot: dataUrl })
                }
            )
        })

        return true
    }
)
