import { ReactNode } from 'react';

export interface BreadCrumbContainerProps {
  children: ReactNode;
  separator: ReactNode;
}

export interface BreadCrumbItemProps {
  children: ReactNode;
  to?: string;
  variant?: 'text' | 'link';
  className?: string;
}
