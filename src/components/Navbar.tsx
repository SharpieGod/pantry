import Link from "next/link";
import { FC, ReactNode } from "react";
import { getServerAuthSession } from "~/server/auth";
import DarkoButton from "./Custom/DarkoButton";
import { FaSearch } from "react-icons/fa";
import NewPostButton from "./NewPostButton";

const Navbar = async () => {
  const session = await getServerAuthSession();

  return (
    <nav className="mt-4 w-full">
      <div className="flex h-20 w-auto items-center justify-between rounded-full border border-background-800 px-12 text-xl md:mx-auto md:w-3/5">
        <Link href="/" className="text-3xl font-bold text-primary-400">
          pantry.
        </Link>

        <ul className="flex gap-4">
          <NavLink href="/about">About</NavLink>

          {session ? (
            <>
              <NavLink href="/account">Account</NavLink>
              <NewPostButton />
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
      </div>
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
