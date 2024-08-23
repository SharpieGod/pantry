import Link from "next/link";
import { FC, ReactNode } from "react";
import { getServerAuthSession } from "~/server/auth";
import DarkoButton from "./Custom/DarkoButton";
import { FaSearch } from "react-icons/fa";

const Navbar = async () => {
  const session = await getServerAuthSession();

  return (
    <nav className="flex h-20 w-auto items-center justify-between px-24 text-xl bg-[#1E1E1E]">
      <Link href="/" className="text-3xl font-bold text-red-500">
        pantry.
      </Link>

      <div className="mx-8 flex-grow">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#f0b090]">
            <FaSearch />
          </span>
          <input
            type="text"
            placeholder="Search"
            className="w-full rounded-md border border-[#f0b090] bg-[#1E1E1E] p-2 pl-10 text-sm text-[#f0b090] placeholder-[#f0b090]"
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
          <NavLink href="/api/auth/signin" variant="signin">
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
  variant?: "primary" | "secondary" | "signin";
}

const NavLink: FC<NavLinkProps> = ({ href, children, variant }) => {
  const buttonClasses = variant === "signin"
    ? "bg-[#333333] text-[#ff7733] py-2 px-4 rounded-md border border-[#2b2b2b] hover:bg-[#2b2b2b] transition-colors duration-300"
    : variant === "secondary"
    ? "bg-[#f0b090] text-[#1E1E1E] py-2 px-4 rounded hover:bg-[#d7987c] transition-colors duration-300"
    : "text-[#f0b090]";

  return (
    <Link href={href}>
      <DarkoButton className={buttonClasses}>
        {children}
      </DarkoButton>
    </Link>
  );
};

export default Navbar;
