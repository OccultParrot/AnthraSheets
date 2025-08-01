import type { ReactElement, ReactNode } from "react";

export type RouteProps = {
  name: string;
  route: string;
  element: ReactElement;
}

export interface SidebarProps {
  defaultOpen?: boolean;
  content?: SidebarContentProps[];
  tabOptions?: boolean;
  tabPosition: 'top' | 'middle' | 'bottom';
}

export interface SidebarContentProps {
  content: ReactNode;
  autoClose?: boolean;
}