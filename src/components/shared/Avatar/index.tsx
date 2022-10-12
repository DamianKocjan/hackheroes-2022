import React from "react";

interface AvatarProps {
  src: string;
  alt: string;
}

export const Avatar: React.FC<AvatarProps> = ({ alt, src }) => {
  return (
    <img className="inline-block h-10 w-10 rounded-full" src={src} alt={alt} />
  );
};
