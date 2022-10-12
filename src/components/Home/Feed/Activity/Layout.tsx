import React from "react";

interface Props {
  children: React.ReactNode;
}

const ActivityNavbar: React.FC<Props> = ({ children }) => (
  <div className="px-4 py-5 sm:px-6">{children}</div>
);

const ActivityBody: React.FC<Props> = ({ children }) => (
  <div className="px-4 py-5 sm:p-6">{children}</div>
);

const ActivityFooter: React.FC<Props> = ({ children }) => (
  <div className="px-4 py-4 sm:px-6">{children}</div>
);

export function Activity({ children }: Props) {
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
      {children}
    </div>
  );
}

Activity.Navbar = ActivityNavbar;
Activity.Body = ActivityBody;
Activity.Footer = ActivityFooter;
