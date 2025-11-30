import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Home, Activity, User } from 'lucide-react';

interface NavbarProps {
  links: { href: string; label: string; icon: React.ReactNode }[];
}

const Navbar: React.FC<NavbarProps> = ({ links }) => {
  const router = useRouter();

  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex justify-around items-center">
        {links.map((link) => (
          <li key={link.href} className="text-white">
            <Link href={link.href}>
              <a
                className={`flex flex-col items-center ${
                  router.pathname === link.href ? 'text-blue-500' : 'text-white'
                }`}
                aria-current={router.pathname === link.href ? 'page' : undefined}
              >
                {link.icon}
                <span className="mt-1 text-sm">{link.label}</span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;

// Usage Example
// <Navbar
//   links={[
//     { href: '/', label: 'Home', icon: <Home /> },
//     { href: '/workouts', label: 'Workouts', icon: <Activity /> },
//     { href: '/profile', label: 'Profile', icon: <User /> },
//   ]}
// />