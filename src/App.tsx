import './App.css'

function App() {
  const sendMessage = () => {
    chrome.runtime.sendMessage({ type: 'PING' })
  }

  return (
    <div style={{ padding: '16px' }}>
      <h2>AI Smart Paste</h2>
      <button onClick={sendMessage}>
        Send message to background
      </button>
    </div>
  )
}

export default App
