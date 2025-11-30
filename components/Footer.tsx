import React from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react';

interface FooterProps {
  links: { name: string; href: string }[];
  socialMedia: { platform: string; href: string }[];
}

const Footer: React.FC<FooterProps> = ({ links, socialMedia }) => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-gray-400"
              aria-label={`Navigate to ${link.name}`}
            >
              {link.name}
            </a>
          ))}
        </div>
        <div className="flex space-x-4 mt-4 md:mt-0">
          {socialMedia.map((media) => {
            let Icon;
            switch (media.platform) {
              case 'Facebook':
                Icon = Facebook;
                break;
              case 'Twitter':
                Icon = Twitter;
                break;
              case 'Instagram':
                Icon = Instagram;
                break;
              default:
                return null;
            }
            return (
              <a
                key={media.platform}
                href={media.href}
                className="hover:text-gray-400"
                aria-label={`Visit our ${media.platform} page`}
              >
                <Icon className="w-6 h-6" />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;