import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'antd/dist/reset.css'
import Articles from './pages/articles'
import ArticleDetail from './pages/articles/ArticleDetail'
import Layout from './components/Layout'
import './App.css'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Articles />} />
          <Route path="/article/:category" element={<Articles />} />
          <Route path="/article/:category/:title" element={<ArticleDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
