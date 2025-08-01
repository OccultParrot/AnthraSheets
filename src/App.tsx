import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import type { ReactElement } from "react";

// Config
import type { RouteProps } from "./config/types.ts";
import { routes } from "./config/routes.tsx";

function App() {
  const Layout = (): ReactElement => {
    return (
      <div className="flex h-screen flex-col">
        <div className="flex h-screen flex-row">
          <main className="grow">
            <Outlet/>
          </main>
        </div>
        {/*<Footer/>*/ }
      </div>
    )
  }


  return (
    <BrowserRouter>
      <Routes>
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
