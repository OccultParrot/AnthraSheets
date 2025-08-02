import type { RouteProps } from "../types.ts";

// Pages
import CharacterSheetPage from "../components/pages/CharacterSheetPage.tsx";
import AboutPage from "../components/pages/AboutPage.tsx";

export const routes: RouteProps[] = [
  {
    name: 'Home',
    route: '/',
    element: <CharacterSheetPage />
  },
  {
    name: 'About',
    route: '/about',
    element: <AboutPage />
  },
]