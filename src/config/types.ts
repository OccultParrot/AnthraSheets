import type { ChangeEvent, ReactElement, ReactNode } from "react";

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

export interface InputChangeEvent<T> {
  name: string;
  value: T
}

interface FormOptionProps {
  label?: string;
  name: string;
  required?: boolean;
  onChange: (e: InputChangeEvent<any>) => void;
}

export interface TextInputProps extends FormOptionProps {
  placeholder?: string;
}

export interface ListInputProps extends FormOptionProps {
  maxItems?: number;
}