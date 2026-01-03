import { useEffect, useState } from "react";

function App() {
  const [count, setCount] = useState<number>(0)
  const [items, setItems] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    chrome.runtime.sendMessage({ type: 'PING' }, (response) => {
      console.log('Popup PING response:', response)
    })

    chrome.runtime.sendMessage({ type: 'GET_QUEUE_COUNT' }, (response) => {
      if (chrome.runtime.lastError) {
        setError(chrome.runtime.lastError.message ?? 'Runtime error.')
        return
      }

      if (!response) {
        setError('No response from background.')
        return
      }

      setCount(response.count)
    })

    chrome.runtime.sendMessage({ type: 'GET_QUEUE_ITEMS' }, (response) => {
      if (chrome.runtime.lastError) {
        setError(chrome.runtime.lastError.message ?? 'Runtime error.')
        return
      }

      setItems(response.items ?? [])
    })

  }, [])

  return (
    <div style={{ padding: '16px', width: '220px' }}>
      <h3>AI Smart Paste</h3>

      <p>
        Queued images: <strong>{count}</strong>
      </p>

      {error && (
        <p style={{ color: 'red', fontSize: '12px' }}>
          {error}
        </p>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '6px',
          marginTop: '8px'
        }}
      >
        {items.map((src, i) => (
          <img
            key={i}
            src={src}
            style={{
              width: '100%',
              height: '60px',
              objectFit: 'cover',
              borderRadius: '4px'
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default App
