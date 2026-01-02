console.log('AI Smart Paste: content script LOADED')

let lastImageSrc: string | null = null

document.addEventListener('mouseover', (e: MouseEvent) => {
    console.log('AI Smart Paste: mouseover fired')
    const target = e.target as HTMLElement

    if (target && target.tagName === 'IMG') {
        const img = target as HTMLImageElement

        if (img.src && img.src != lastImageSrc) {
            lastImageSrc = img.src

            chrome.runtime.sendMessage({
                type: 'IMAGE_HOVERED',
                src: img.src
            })
        }
    }
})
