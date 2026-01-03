chrome.runtime.onInstalled.addListener(() => {
    console.log('BACKGROUND: installed / awakened')
})

const MAX_STACK_SIZE = 10

async function getStack(): Promise<string[]> {
    const result = await chrome.storage.local.get('imageStack');
    const stack = result.imageStack

    if (Array.isArray(stack)) {
        return stack
    }
    return [];
}

async function saveStack(stack: string[]) {
    await chrome.storage.local.set({ imageStack: stack });
}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    (async () => {
        switch (message.type) {
            case 'IMAGE_HOVERED': {
                const src = message.src as string;
                let stack = await getStack();

                if (stack.length >= MAX_STACK_SIZE) {
                    console.log('Image queue full — ignoring hover');
                    return;
                }

                if (!stack.includes(src)) {
                    stack.unshift(src);
                    await saveStack(stack);
                    console.log('Image queued:', src);
                }
                break;
            }

            case 'GET_QUEUE_COUNT': {
                const stack = await getStack();
                sendResponse({ count: stack.length });
                break;
            }

            case 'GET_QUEUE_ITEMS': {
                const stack = await getStack();
                sendResponse({ items: stack });
                break;
            }
        }
    })();

    return true; // IMPORTANT for async response
});

