import type { RouteProps } from "../types.ts";

// Pages
import CharacterSheetPage from "../components/pages/CharacterSheetPage.tsx";
import AboutPage from "../components/pages/AboutPage.tsx";

/**
 * The list of routes for the application.
 *
 * Used to generate the routes in the browser-router.
 */
export const routes: RouteProps[] = [
  {
    name: 'Home',
    route: '/',
    element: <CharacterSheetPage/>
  },
  {
    name: 'About',
    route: '/about',
    element: <AboutPage/>
  },
]