import Link from "next/link";
import { FC, ReactNode } from "react";
import { getServerAuthSession } from "~/server/auth";
import DarkoButton from "./Custom/DarkoButton";

const Navbar = async () => {
  const session = await getServerAuthSession();

  return (
    <nav className="flex h-20 w-auto px-24 items-center justify-between text-xl bg-[#F8F0C7]">
      <Link href="/" className="text-3xl font-bold text-red-500 ">
        pantry.
      </Link>

      <ul className="flex gap-4">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/about">About</NavLink>
        <NavLink href="/categories">Categories</NavLink>
        <NavLink href="/account">Account</NavLink>

        {session ? (
          <>
            <NavLink href="/post/new">Make Posting</NavLink>
            <NavLink href="api/auth/signout" variant="secondary">
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
