import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import SubjectProvider from './Contexts/SubjectContext'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/'>
        <Route index element={<Home/>}/>
      </Route>
    )
  )
  return (
    <SubjectProvider>
      <RouterProvider router={router}/>
    </SubjectProvider>
    
  )
}

export default App
