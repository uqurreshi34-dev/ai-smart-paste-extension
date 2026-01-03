import { useEffect, useState } from "react";
import "./App.css";

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

      {items.length > 0 && (
        <div className="grid">
          {items.map((src) => (
            <img
              key={src}
              src={src}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
