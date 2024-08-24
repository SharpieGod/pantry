import Link from "next/link";
import { FC, ReactNode } from "react";
import { getServerAuthSession } from "~/server/auth";
import DarkoButton from "./Custom/DarkoButton";
import { FaSearch } from "react-icons/fa";
import NewPostButton from "./NewPostButton";
import SearchBox from "./SearchBox";
import { FoodCategory } from "@prisma/client";

interface NavbarProps {
  search?: boolean;
  query?: string;
  filter?: FoodCategory | null;
}
const Navbar: FC<NavbarProps> = async ({ search, query, filter }) => {
  const session = await getServerAuthSession();

  return (
    <nav className="w-full">
      <div className="relative flex w-full items-center justify-between gap-4 bg-background-900/50 p-4 px-12 text-xl">
        <Link href="/" className="text-3xl font-bold text-primary-400">
          pantry.
        </Link>

        <div className="absolute left-1/2 top-1/2 w-96 -translate-x-1/2 -translate-y-1/2">
          {search && <SearchBox query={query ?? ""} />}
        </div>

        <ul className="flex items-center gap-4">
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
