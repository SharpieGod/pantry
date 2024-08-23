import Link from "next/link";
import { FC, ReactNode } from "react";
import { getServerAuthSession } from "~/server/auth";
import DarkoButton from "./Custom/DarkoButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Navbar = async () => {
  const session = await getServerAuthSession();

  return (
    <nav className="flex h-20 w-auto items-center justify-between bg-background-900/80 px-24 text-xl">
      <Link href="/" className="text-3xl font-bold text-red-500">
        pantry.
      </Link>

      {/* Search Bar with Magnifying Glass Icon */}
      <div className="flex-grow mx-8">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <FontAwesomeIcon icon={faSearch} className="text-grey-100" /> 
          </span>
          <input
            type="text"
            placeholder="Search"
            className="w-full p-2 pl-10 text-sm border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <ul className="flex gap-4">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/about">About</NavLink>
        <NavLink href="/categories">Categories</NavLink>
        <NavLink href="/account">Account</NavLink>

        {session ? (
          <>
            <NavLink href="/post/new">Make Posting</NavLink>
            <NavLink href="/api/auth/signout" variant="secondary">
              Logout
            </NavLink>
          </>
        ) : (
          <NavLink href="/api/auth/signin" variant="secondary">
            Sign In
          </NavLink>
        )}
      </ul>
    </nav>
  );
};

interface NavLinkProps {
  href: string;
  children?: ReactNode;
  variant?: "primary" | "secondary";
}

const NavLink: FC<NavLinkProps> = ({ href, children, variant }) => {
  return (
    <Link href={href}>
      <DarkoButton variant={variant ?? "ghost"}>{children}</DarkoButton>
    </Link>
  );
};

export default Navbar;
