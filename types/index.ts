import { Icons } from '@/components/icons';

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
}

// export type Election = {
//   id: number;
//   name: string;
//   city: string;
//   candidates: Candidate[];
//   startTime: number;
//   endTime: number;
// };

// export type Candidate = {
//   id: number;
//   name: string;
//   partyName: string;
//   votes: number;
// };

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;
