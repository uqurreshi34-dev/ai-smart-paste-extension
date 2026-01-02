const imageStack: string[] = []
const MAX_STACK_SIZE = 10

chrome.runtime.onMessage.addListener(
    (message, _sender, _sendResponse) => {
        switch (message.type) {
            case 'IMAGE_HOVERED': {
                const src = message.src as string

                if (!imageStack.includes(src)) {
                    imageStack.unshift(src)

                    if (imageStack.length > MAX_STACK_SIZE) {
                        imageStack.pop()
                    }

                    console.log('Image queued:', src)
                    console.log('Stack size:', imageStack.length)
                }
                break
            }

            case 'GET_QUEUE_COUNT': {
                _sendResponse({ count: imageStack.length })
                break
            }

            // future message types go here
        }
    }
)
