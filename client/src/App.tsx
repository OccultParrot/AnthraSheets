import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import type { ReactElement } from "react";

// Layout Elements
import Modal from "./components/layout/Modal.tsx";
import Header from "./components/layout/Header.tsx"
import Footer from "./components/layout/Footer.tsx";

// Config
import type { RouteProps } from "./types.ts";
import { routes } from "./config/routes.tsx";
import ModalText from "./config/ModalText.tsx";
import { modalId } from "./config/constants.ts";
import { UserProvider } from "./components/providers/UserProvider.tsx";

function App() {
  
  const makeRoute = (item: RouteProps, index: number) => {
    console.log(item.route)
    return (
      <Route path={ item.route } element={ item.element } index={ index === 0 }/>
    )
  }


  const Layout = (): ReactElement => {
    return (
      <div className="flex h-screen flex-col">
        {
          localStorage.getItem("welcome") !== modalId ? (
            <Modal title="Welcome to AnthraSheets!" onClose={() => {
              localStorage.setItem("welcome", modalId);
            }}>
              <ModalText/>
            </Modal>
          ) : <></>
        }

        <Header/>
        <main className="grow">
          <Outlet/>
        </main>
        <Footer/>
      </div>
    )
  }


  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          {/* Generating Routes */ }
          <Route path="/" element={ <Layout/> }>
            {
              routes.map((item: RouteProps, index: number) => (
                makeRoute(item, index)
              ))
            }
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App
