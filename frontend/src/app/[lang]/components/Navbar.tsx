"use client";
import Logo from "./Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from "react";

interface NavLink {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
}

interface MobileNavLink extends NavLink {
  closeMenu: () => void;
}

function NavLink({ url, text }: NavLink) {
  const path = usePathname();

  return (
    <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref="">
      <Link
        href={url}
        className={`font-sf-pro text-neutral-500 
        transition duration-200 hover:text-neutral-700
         hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 
         dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300
          lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-zinc-400 
          ${path === url && 'dark:text-black-400'}`
        }>
        {text}
      </Link>
    </li>

  );
}

function MobileNavLink({ url, text, closeMenu }: MobileNavLink) {
  const path = usePathname();
  const handleClick = () => {
    closeMenu();
  }
  return (
    <a className="flex">
      <Link
        href={url}
        onClick={handleClick}
        className={`mx-3 block rounded-lg px-3 py-2 text-[#333] font-semibold leading-7 text-gray-100 hover:bg-gray-900 
         ${path === url && "dark:text-violet-400 dark:border-violet-400"}`}>
        {text}
      </Link>
    </a>
  );
}

export default function Navbar({
  links,
  logoUrl,
  logoText,
}: {
  links: Array<NavLink>;
  logoUrl: string | null;
  logoText: string | null;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const closeMenu = () => {
    setMobileMenuOpen(false)
  }
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(scrollY > 100);
    };

    // Attach the event listener when the component mounts
    window.addEventListener('scroll', handleScroll);

    // Detach the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
      <div className={`dark:bg-black dark:text-gray-100  bg-[transparent]  w-full   ${isScrolled ? '!fixed top-0 z-10 !bg-[#fff] shadow-md shadow-black/5 dark:shadow-black/10"' : ''}`}>
        <div className="2xl:container flex justify-between mx-auto px-0 sm:px-6">
          <nav className="flex-no-wrap relative flex w-full items-center justify-between  lg:flex-wrap lg:justify-start">
            <div className="flex w-full flex-wrap items-center justify-between px-3">
              <div className="lg:hidden mobile-logo">
              <Logo src={logoUrl} >
                    {logoText && <h2 className="text-2xl font-bold">{logoText}</h2>}
            </Logo>
              </div>
           
              <div className="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto" id="navbarSupportedContent1" data-te-collapse-item="">
                <a className="mb-4 ml-2 mr-5 mt-3 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:mb-0 lg:mt-0" href="#">
                  <Logo src={logoUrl} >
                    {logoText && <h2 className="text-2xl font-bold">{logoText}</h2>}
                  </Logo>
                </a>

                <ul className="list-style-none mx-auto flex flex-col pl-0 lg:flex-row" data-te-navbar-nav-ref="">

                  {links.map((item: NavLink) => (
                    <NavLink key={item.id} {...item} />
                  ))}
                </ul>
                <div className="relative flex items-center lg:ms-[200px]">

                  <a className="mr-4 text-neutral-600 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 [&amp;.active]:text-black/90 dark:[&amp;.active]:text-neutral-400" href="#">
                    <span className="[&amp;>svg]:w-5">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                        <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"></path>
                      </svg>
                    </span>
                  </a>
                  <div className="relative" data-te-dropdown-ref="" data-te-dropdown-alignment="end">
                    <a className="hidden-arrow mr-4 flex items-center text-neutral-600 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 [&amp;.active]:text-black/90 dark:[&amp;.active]:text-neutral-400" href="#" id="dropdownMenuButton1" role="button" data-te-dropdown-toggle-ref="" aria-expanded="false">
                      <span className="[&amp;>svg]:w-5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                          <path fillRule="evenodd" d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z" clipRule="evenodd"></path>
                        </svg>
                      </span>
                      <span className="absolute -mt-4 ml-2.5 rounded-full bg-danger px-[0.35em] py-[0.15em] text-[0.6rem] font-bold leading-none text-white">1</span>
                    </a>
                    <ul className="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&amp;[data-te-dropdown-show]]:block" aria-labelledby="dropdownMenuButton1" data-te-dropdown-menu-ref="">
                      <li>
                        <a className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30" href="#" data-te-dropdown-item-ref="">Action</a>
                      </li>
                      <li>
                        <a className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30" href="#" data-te-dropdown-item-ref="">Another action</a>
                      </li>
                      <li>
                        <a className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30" href="#" data-te-dropdown-item-ref="">Something else here</a>
                      </li>
                    </ul>
                  </div>
                  <div className="relative" data-te-dropdown-ref="" data-te-dropdown-alignment="end">

                  </div>
                </div>
              </div>


            </div>
          </nav>
          <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
            <div className="fixed inset-0 z-50" />
            <Dialog.Panel className="fixed bg-[#fff]  inset-y-0 right-0 z-50 w-full overflow-y-auto dark:bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10 max-w-[300px]">
              <div className="flex items-center justify-between">
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">Strapi</span>
                  {logoUrl &&
                    <img
                      className="h-8 w-auto"
                      src={logoUrl}
                      alt=""
                    />
                  }
                </a>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-[#333]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-200/10">
                  <div className="space-y-2 py-6">
                    {links.map((item) => (
                      <MobileNavLink
                        key={item.id}
                        closeMenu={closeMenu}
                        {...item} />
                    ))}
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Dialog>
          <button
            className="p-4 lg:hidden"
            onClick={() => setMobileMenuOpen(true)} >
            <Bars3Icon className="h-7 w-7 text-[#333]" aria-hidden="true" />
          </button>

        </div>
      </div>

    </>

  );
}
