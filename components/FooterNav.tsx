import React, { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronUp } from 'lucide-react'

const FooterNav = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  const navItems = [
    { name: 'Sports Bikes', href: '#' },
    { name: 'Naked Bikes', href: '#' },
    { name: 'Latest Bikes / New Bikes', href: '#' },
    { name: 'Bikes by Price', href: '#' },
    { name: 'Bikes by Engine Capacity', href: '#' },
    { name: 'All Bikes', href: '#' },
    { name: 'Faqs', href: '#' },
    { name: 'Blogs', href: '#' },
  ]

  return (
    <nav className="bg-[#1c1c1c] py-6 text-white text-sm border-y-[1px] border-[#ffffff33]">
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="lg:hidden w-full flex items-center justify-between px-4 mb-4"
      >
        <span className="font-semibold">Quick Links</span>
        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {/* Navigation Links */}
      <ul
        className={`lg:flex lg:justify-center lg:gap-8 ${isExpanded ? 'block' : 'hidden lg:block'}`}
      >
        {navItems.map((item) => (
          <li key={item.name} className="lg:inline-block">
            <Link
              href={item.href}
              className="block py-2 px-4 lg:py-0 lg:px-0 hover:underline font-semibold transition-colors duration-200"
              onClick={() => setIsExpanded(false)}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default FooterNav
