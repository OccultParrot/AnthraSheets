import type { RouteProps } from "./types.ts";

// Pages
import HomePage from "../components/pages/HomePage.tsx";
import AboutPage from "../components/pages/AboutPage.tsx";

export const routes: RouteProps[] = [
  {
    name: 'Home',
    route: '/',
    element: <HomePage />
  },
  {
    name: 'About',
    route: '/about',
    element: <AboutPage />
  },
]