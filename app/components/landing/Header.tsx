"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [scrollY, setScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [activeId, setActiveId] = useState<string>("top");
  const pathname = usePathname();

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    setMobileOpen(false);

    if (targetId === "contact") {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      setActiveId("contact");
      return;
    }

    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(targetId);
    } else if (targetId === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActiveId("top");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);

      const sectionIds = ["top", "services", "waiting-list", "contact"];
      let currentActiveId = "top";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.3) {
          currentActiveId = id;
        }
      }
      if (currentActiveId !== activeId) {
        setActiveId(currentActiveId);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, activeId]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header
      className={`w-full fixed top-0 z-50 transition-all duration-300 ${
        scrollY > 100
          ? "bg-white/5 backdrop-blur-lg shadow-lg"
          : "bg-transparent"
      } translate-y-0`}
    >
      {/* Desktop */}
      <div className="hidden lg:flex items-center justify-center h-20 bg-[#E9F2FEDB]/[0.56] ">
        <nav className="w-full max-w-7xl px-6">
          <div className="flex justify-center items-center gap-x-20">
            {/* Left links */}
            <ul className="flex items-center gap-20 justify-center">
              <li>
                <Link
                  className={`text-center font-[Foco] text-[16px] font-normal leading-normal uppercase ${
                    pathname === "/aboutus"
                      ? "text-[#004AAD]"
                      : "text-[#82B3B4]"
                  } nav-link`}
                  href="/aboutus"
                  onClick={() => setMobileOpen(false)}
                >
                  ABOUT US
                </Link>
              </li>
              <li>
                <Link
                  className={`text-center font-[Foco] text-[16px] font-normal leading-normal uppercase ${
                    pathname === "/ourprogram"
                      ? "text-[#004AAD]"
                      : "text-[#82B3B4]"
                  } nav-link`}
                  href="/ourprogram"
                  onClick={() => setMobileOpen(false)}
                >
                  OUR PROGRAMME
                </Link>
              </li>
            </ul>

            {/* Center logo */}
            {/* <div className="flex items-center justify-center">
              <img src="/Group.png" alt="logo" className="w-18 h-15" />
            </div> */}

            <Link href="/">
              <div className="flex items-center justify-center">
                <img src="/Group.png" alt="logo" className="w-18 h-15" />
              </div>
            </Link>

            {/* Right links */}
            <ul className="flex items-center gap-12">
              <li>
                <Link
                  className={`text-center font-[Foco] text-[16px] font-normal leading-normal uppercase ${
                    pathname === "/waitlist"
                      ? "text-[#004AAD]"
                      : "text-[#82B3B4]"
                  } nav-link`}
                  href="/waitlist"
                  onClick={() => setMobileOpen(false)}
                >
                  FAMILY PARTNERSHIP
                </Link>
              </li>
              <li>
                <a
                  href="#contact"
                  className={`text-center font-[Foco] text-[16px] font-normal leading-normal uppercase ${
                    activeId === "contact" ? "text-[#004AAD]" : "text-[#82B3B4]"
                  } nav-link`}
                  onClick={(e) => handleNavClick(e, "contact")}
                >
                  CONTACT US
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {/* Mobile */}
      <div className="lg:hidden">
        {/* <div className="h-16 px-4 flex items-center justify-between"> */}
    <div className="h-16 px-4 grid grid-cols-3 items-center bg-[#E9F2FEDB]">
  {/* Left: Toggle Menu */}
  <button
    aria-label="Toggle menu"
    className={`transition-colors duration-300 justify-self-start ${
      scrollY > 100 ? "text-gray-800/80" : "text-[#82B3B4]/80"
    }`}
    onClick={() => setMobileOpen((v) => !v)}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={`w-6 h-6 ${
        scrollY > 100 ? "text-[#82B3B4]" : "text-[#82B3B4]"
      }`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  </button>

  {/* Middle: Logo */}
  <Link href="/" className="flex justify-center">
    <img
      src="/Group.png"
      alt="logo"
      className="w-[72px] h-[60px] object-contain p-[5]"
    />
  </Link>

  {/* Right: Empty Space (Keeps center alignment) */}
  <div></div>
</div>

        {mobileOpen && (
          <div className="px-4 pb-4">
            <ul className="grid grid-cols-1 gap-3">
              <li>
                <Link
                  className={`font-normal ${
                    pathname === "/aboutus"
                      ? "text-[#004AAD]"
                      : "text-[#82B3B4]"
                  } nav-link`}
                  href="/aboutus"
                  onClick={() => setMobileOpen(false)}
                >
                  ABOUT US
                </Link>
              </li>
              <li>
                <Link
                  className={`font-[Foco] text-[16px] font-normal leading-normal uppercase ${
                    pathname === "/ourprogram"
                      ? "text-[#004AAD]"
                      : "text-[#82B3B4]"
                  } nav-link`}
                  href="/ourprogram"
                  onClick={() => setMobileOpen(false)}
                >
                  OUR PROGRAMME
                </Link>
              </li>
              <li>
                <Link
                  className={`font-[Foco] text-[16px] font-normal leading-normal uppercase ${
                    pathname === "/waitlist"
                      ? "text-[#004AAD]"
                      : "text-[#82B3B4]"
                  } nav-link`}
                  href="/waitlist"
                  onClick={() => setMobileOpen(false)}
                >
                  FAMILY PARTNERSHIP
                </Link>
              </li>
              <li>
                <a
                  href="#contact"
                  className={`font-[Foco] text-[16px] font-normal leading-normal uppercase ${
                    activeId === "contact" ? "text-[#004AAD]" : "text-[#82B3B4]"
                  } nav-link`}
                  onClick={(e) => handleNavClick(e, "contact")}
                >
                  CONTACT US
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
