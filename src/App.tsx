import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PdfReactPdf from './components/pdfView'
import PageLayout from './components/pageLayout'

import PdfViewerPage from './components/MainView'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <PdfReactPdf src={"src/assets/2023-conocophillips-aim-presentation.pdf"}/> */}
      {/* <PageLayout /> */}
      <PdfViewerPage/>
    </>
  )
}

export default App
