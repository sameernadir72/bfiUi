import { NavItem } from '@/types';

export type Candidate = {
  id: number;
  name: string;
  partyName: string;
  votes: number;
};

export type Election = {
  id: number;
  name: string;
  city: string;
  candidates: Candidate[];
  startTime: string;
  endTime: string;
};

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};
export const users: Candidate[] = [
  {
    id: 1,
    name: 'Michael Lee',
    partyName: '',
    votes: 1
  }
];
export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'dashboard',
    label: 'Dashboard'
  },
  {
    title: 'Manage Elections',
    href: '/dashboard/elections',
    icon: 'user',
    label: 'user'
  },
  {
    title: 'Result',
    href: '/dashboard/result',
    icon: 'employee',
    label: 'result'
  },
  {
    title: 'Profile',
    href: '/dashboard/profile',
    icon: 'profile',
    label: 'profile'
  },
  // {
  //   title: 'Kanban',
  //   href: '/dashboard/kanban',
  //   icon: 'kanban',
  //   label: 'kanban'
  // },
  {
    title: 'Cast Vote ',
    href: '/dashboard/castVoting',
    icon: 'Cast',
    label: 'Cast'
  },
  {
    title: 'Login',
    href: '/',
    icon: 'login',
    label: 'login'
  }
];
