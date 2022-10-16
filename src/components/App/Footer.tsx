import Link from "next/link";
import {
  FacebookLogo,
  GithubLogo,
  InstagramLogo,
  TwitterLogo,
} from "phosphor-react";

const NAVIGATION = {
  main: [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Jobs", href: "#" },
    { name: "Press", href: "#" },
    { name: "Accessibility", href: "#" },
    { name: "Partners", href: "#" },
  ],
  social: [
    {
      name: "Facebook",
      href: "#",
      icon: () => <FacebookLogo className="h-6 w-6" aria-hidden="true" />,
    },
    {
      name: "Instagram",
      href: "#",
      icon: () => <InstagramLogo className="h-6 w-6" aria-hidden="true" />,
    },
    {
      name: "Twitter",
      href: "#",
      icon: () => <TwitterLogo className="h-6 w-6" aria-hidden="true" />,
    },
    {
      name: "GitHub",
      href: "#",
      icon: () => <GithubLogo className="h-6 w-6" aria-hidden="true" />,
    },
  ],
};

export const Footer: React.FC = () => (
  <footer className="bg-white">
    <div className="mx-auto max-w-7xl overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      <nav
        className="-mx-5 -my-2 flex flex-wrap justify-center"
        aria-label="Footer"
      >
        {NAVIGATION.main.map((item) => (
          <div key={item.name} className="px-5 py-2">
            <Link
              href={item.href}
              className="text-base text-gray-500 hover:text-gray-900"
            >
              {item.name}
            </Link>
          </div>
        ))}
      </nav>
      <div className="mt-8 flex justify-center space-x-6">
        {NAVIGATION.social.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="text-gray-400 hover:text-gray-500"
          >
            <a>
              <span className="sr-only">{item.name}</span>
              <item.icon />
            </a>
          </Link>
        ))}
      </div>
      <p className="mt-8 text-center text-base text-gray-400">
        &copy; {new Date().getFullYear()} This Place, All rights reserved.
      </p>
    </div>
  </footer>
);
