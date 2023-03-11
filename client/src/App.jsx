import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="">
      <h1 className="text-3xl font-thin text-white bg-red-600 text-center underline">
        Home
      </h1>
    </div>
  )
}

export default App
