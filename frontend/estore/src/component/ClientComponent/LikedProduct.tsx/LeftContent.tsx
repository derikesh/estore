import React from 'react'

interface SECTION_INTERFACE {
    className?: string,
    title: string
}

export default function LeftContent({ className, title }: SECTION_INTERFACE) {
  return (
    <div className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md ${className}`}>
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl lg:h-[80vh] sm:text-4xl font-bold flex justify-center items-center text-gray-900 dark:text-white mb-4">{title}</h2>
      </div>
    </div>
  )
}