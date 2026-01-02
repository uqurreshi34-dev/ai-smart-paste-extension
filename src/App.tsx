import { useEffect, useState } from "react";

function App() {
  const [count, setCount] = useState<number>(0)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    chrome.runtime.sendMessage({ type: 'GET_QUEUE_COUNT' }, (response) => {
      if (chrome.runtime.lastError) {
        setError(chrome.runtime.lastError.message ?? 'Unknown runtime error.')
        return
      }

      if (!response) {
        setError('No response from background.')
        return
      }

      setCount(response.count)
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
    </div>
  )
}

export default App
