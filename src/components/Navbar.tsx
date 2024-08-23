import Link from "next/link";
import { FC, ReactNode } from "react";
import { getServerAuthSession } from "~/server/auth";
import DarkoButton from "./Custom/DarkoButton";

const Navbar = async () => {
  const session = await getServerAuthSession();

  return (
    <nav className="flex h-20 items-center justify-around text-xl">
      <Link href="/" className="text-2xl">
        Pantry
      </Link>

      <ul className="flex gap-4">
        <NavLink href="/about">About</NavLink>

        {session ? (
          <>
            <NavLink href="/post/new">Make Posting</NavLink>
            <NavLink href="api/auth/signout">Logout</NavLink>
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
