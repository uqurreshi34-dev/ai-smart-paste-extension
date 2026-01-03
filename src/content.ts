
console.log('CONTENT SCRIPT LOADED');

const SUPPORTED_AI_SITES = [
    'chat.openai.com',
    'chatgpt.com',
    'claude.ai'
]

function isSupportedAISite(): boolean {
    const hostname = window.location.hostname
    return SUPPORTED_AI_SITES.some(site =>
        hostname === site || hostname.endsWith(`.${site}`)
    )
}

console.log('AI Smart Paste: hostname =', window.location.hostname)


if (isSupportedAISite()) {
    console.log('AI Smart Paste: Supported AI site detected')
} else {
    console.log('AI Smart Paste: Not an AI site')
}

const seen = new Set<string>();

document.addEventListener(
    'pointerenter',
    (e) => {
        const target = e.target;

        if (!(target instanceof Element)) return;

        // Find the nearest image *or picture*
        const img = target.closest('img, picture') as HTMLElement | null;
        if (!img) return;

        // Delay extraction to allow lazy-loading / srcset resolution
        requestAnimationFrame(() => {
            // let actualImg: HTMLImageElement | null = null;

            // if (img instanceof HTMLImageElement) {
            //     actualImg = img;
            // } else {
            //     actualImg = img.querySelector('img');
            // }
            let actualImg: HTMLImageElement | null = null;

            if (img instanceof HTMLImageElement) {
                actualImg = img;
            } else {
                // 🔍 Look deeper for thumbnails inside links / video cards
                actualImg =
                    img.querySelector('img') ||
                    img.closest('a')?.querySelector('img') ||
                    img.closest('[role="link"]')?.querySelector('img') ||
                    null;
            }

            if (!actualImg) return;

            const src = actualImg.currentSrc || actualImg.src;
            if (!src) return;

            if (seen.has(src)) return;
            seen.add(src);

            chrome.runtime.sendMessage({
                type: 'IMAGE_HOVERED',
                src
            });

            console.log('Queued image:', src);
        });
    },
    true
);
