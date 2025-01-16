import React from 'react';

interface HeadingProps {
  title: string;
}

export default function HeadingComp({ title }: HeadingProps) {
  return (
    <div className="relative">
      <h2 className="text-3xl font-semibold">{title}</h2>
      <div className="absolute bottom-0 left-4 w-[200px] h-[50%] bg-cyan-300 opacity-40 -z-10"></div>
    </div>
  );
}