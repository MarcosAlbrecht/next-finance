// "use client";

// import { usePathname } from "next/navigation";
// import { useState } from "react";

// const NavBar = () => {
//   const pathName = usePathname();
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     // <div>
//     //   {/* Mobile Dropdown Menu */}
//     //   <div className="flex items-center justify-between px-4 py-4 md:hidden">
//     //     <Image src="logo.svg" width={120} height={30} alt="Finance" />
//     //     <button className="text-primary" onClick={() => setMenuOpen(!menuOpen)}>
//     //       <MenuIcon />
//     //     </button>
//     //   </div>
//     //   {menuOpen && (
//     //     <div className="flex flex-col px-4 py-2 shadow md:hidden">
//     //       <Link
//     //         href="/"
//     //         className={
//     //           pathName === "/"
//     //             ? "font-bold text-primary"
//     //             : "text-muted-foreground"
//     //         }
//     //       >
//     //         Dashboard
//     //       </Link>
//     //       <Link
//     //         href="/transactions"
//     //         className={
//     //           pathName === "/transactions"
//     //             ? "font-bold text-primary"
//     //             : "text-muted-foreground"
//     //         }
//     //       >
//     //         Transações
//     //       </Link>
//     //       <Link
//     //         href="/subscription"
//     //         className={
//     //           pathName === "/subscription"
//     //             ? "font-bold text-primary"
//     //             : "text-muted-foreground"
//     //         }
//     //       >
//     //         Assinatura
//     //       </Link>
//     //     </div>
//     //   )}

//     //   {/* Desktop Menu */}
//     //   <nav className="hidden justify-between border-b border-solid px-8 py-4 md:flex">
//     //     <div className="flex items-center gap-10">
//     //       <Image src="logo.svg" width={173} height={39} alt="Finance" />
//     //       <Link
//     //         href="/"
//     //         className={
//     //           pathName === "/"
//     //             ? "font-bold text-primary"
//     //             : "text-muted-foreground"
//     //         }
//     //       >
//     //         Dashboard
//     //       </Link>
//     //       <Link
//     //         href="/transactions"
//     //         className={
//     //           pathName === "/transactions"
//     //             ? "font-bold text-primary"
//     //             : "text-muted-foreground"
//     //         }
//     //       >
//     //         Transações
//     //       </Link>
//     //       <Link
//     //         href="/subscription"
//     //         className={
//     //           pathName === "/subscription"
//     //             ? "font-bold text-primary"
//     //             : "text-muted-foreground"
//     //         }
//     //       >
//     //         Assinatura
//     //       </Link>
//     //     </div>
//     //     <UserButton showName />
//     //   </nav>
//     // </div>
//     <nav className="border-gray-200 bg-white dark:bg-gray-900">
//       <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
//         <a
//           href="https://flowbite.com/"
//           className="flex items-center space-x-3 rtl:space-x-reverse"
//         >
//           <img
//             src="https://flowbite.com/docs/images/logo.svg"
//             className="h-8"
//             alt="Flowbite Logo"
//           />
//           <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
//             Flowbite
//           </span>
//         </a>
//         <button
//           data-collapse-toggle="navbar-default"
//           type="button"
//           className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
//           aria-controls="navbar-default"
//           aria-expanded="false"
//         >
//           <span className="sr-only">Open main menu</span>
//           <svg
//             className="h-5 w-5"
//             aria-hidden="true"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 17 14"
//           >
//             <path
//               stroke="currentColor"
//               stroke-linecap="round"
//               stroke-linejoin="round"
//               stroke-width="2"
//               d="M1 1h15M1 7h15M1 13h15"
//             />
//           </svg>
//         </button>
//         <div className="hidden w-full md:block md:w-auto" id="navbar-default">
//           <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900 rtl:space-x-reverse">
//             <li>
//               <a
//                 href="#"
//                 className="block rounded bg-blue-700 px-3 py-2 text-white dark:text-white md:bg-transparent md:p-0 md:text-blue-700 md:dark:text-blue-500"
//                 aria-current="page"
//               >
//                 Home
//               </a>
//             </li>
//             <li>
//               <a
//                 href="#"
//                 className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
//               >
//                 About
//               </a>
//             </li>
//             <li>
//               <a
//                 href="#"
//                 className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
//               >
//                 Services
//               </a>
//             </li>
//             <li>
//               <a
//                 href="#"
//                 className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
//               >
//                 Pricing
//               </a>
//             </li>
//             <li>
//               <a
//                 href="#"
//                 className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
//               >
//                 Contact
//               </a>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default NavBar;
"use client";
import { MenuIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathName = usePathname();

  return (
    <nav className="border-gray-200 bg-white dark:bg-gray-900">
      <div className="max-w-screen , mx-auto flex flex-wrap items-center justify-between p-4 md:justify-start">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="logo.svg" className="h-8" alt="Flowbite Logo" />
        </a>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
          aria-controls="navbar-default"
          aria-expanded={menuOpen ? "true" : "false"}
          onClick={() => setMenuOpen(!menuOpen)} // Toggling menu
        >
          <span className="sr-only">Open main menu</span>

          <MenuIcon />
        </button>
        {/* Mobile Menu */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } w-full pl-4 md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900 rtl:space-x-reverse">
            <li>
              <a
                href="/"
                className={`block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500 ${
                  pathName === "/"
                    ? "bg-primary font-bold text-primary md:bg-transparent md:text-primary md:dark:text-primary"
                    : "text-muted-foreground"
                }`}
                aria-current="page"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="/transactions"
                className={`block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500 ${
                  pathName === "/transactions"
                    ? "bg-primary font-bold text-primary md:bg-transparent md:text-primary md:dark:text-primary"
                    : "text-muted-foreground"
                }`}
              >
                Transações
              </a>
            </li>
            <li>
              <a
                href="/subscription"
                className={`block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500 ${
                  pathName === "/subscription"
                    ? "bg-primary font-bold text-primary md:bg-transparent md:text-primary md:dark:text-primary"
                    : "text-muted-foreground"
                }`}
              >
                Assinatura
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
