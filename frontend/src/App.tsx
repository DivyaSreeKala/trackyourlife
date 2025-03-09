import { lazy, Suspense, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const LazyComponent = lazy(() => import('./LazyComponent.tsx'));
  return (
    <>
      <Suspense fallback={<div>
        <video id="banner-video" autoPlay muted playsInline loop>
            <source src="/loading.webm" type="video/webm"/>
            Loading ........
        </video>
      </div>}>
          {/* <p>hello</p> */}
          <LazyComponent/>
        </Suspense>  
    </>
  )
}

export default App
