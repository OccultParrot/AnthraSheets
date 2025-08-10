import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import type { ReactElement } from "react";

// Layout Elements
import Modal from "./components/layout/Modal.tsx";
import Header from "./components/layout/Header.tsx"
import Footer from "./components/layout/Footer.tsx";

// Config
import type { RouteProps } from "./types.ts";
import { routes } from "./config/routes.tsx";


function App() {
  const Layout = (): ReactElement => {
    return (
      <div className="flex h-screen flex-col">
        <Modal isOpen={true} title="Test Modal">
          <p>Testttt ttttttttttttttt tttttttttttttttt tttttttttttttttttttttt ttttttttttttttttttttttt ttttttttttttttttttttttttt ttttttttttttttttt</p>
        </Modal>
        <Header/>
        <main className="grow">
          <Outlet/>
        </main>
        <Footer/>
      </div>
    )
  }


  return (
    <BrowserRouter>
      <Routes>
        {/* Generating Routes */ }
        <Route path="/" element={ <Layout/> }>
          {
            routes.map((item: RouteProps, index: number) => (
              <Route path={ item.route } element={ item.element } index={ index === 0 }/>
            ))
          }
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
