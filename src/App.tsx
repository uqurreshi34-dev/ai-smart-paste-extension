function App() {
  const captureScreenshot = () => {
    chrome.runtime.sendMessage({ type: 'CAPTURE_VISIBLE_TAB' })
  }

  return (
    <div style={{ padding: '16px' }}>
      <h2>AI Smart Paste</h2>

      <button onClick={captureScreenshot}>
        Capture Visible Tab
      </button>
    </div>
  )
}

export default App
