import type { RouteProps } from "../types.ts";

// Pages
import CharacterSheetPage from "../components/pages/CharacterSheetPage.tsx";
import AboutPage from "../components/pages/AboutPage.tsx";
import LandingPage from "../components/pages/LandingPage.tsx";

/**
 * The list of routes for the application.
 *
 * Used to generate the routes in the browser-router.
 */
export const routes: RouteProps[] = [
  {
    name: 'Sheet Generator',
    route: '/',
    element: <CharacterSheetPage/>
  },
  // TODO: Change route to / when ready to launch
  {
    name: 'landing',
    route: '/indev',
    element: <LandingPage />
  },
  {
    name: 'About',
    route: '/about',
    element: <AboutPage/>
  },
]