"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Menu, X, User, LogOut } from "lucide-react";
import { useToken } from "@/hooks/useToken";
import { UserLogOutAPI } from "@/lib/api";
import { clearToken } from "@/lib/session";
import { fetchProfile, profileCleared, selectProfile } from "@/store/slices/profileSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu/DropdownMenu";
import styles from "./SiteHeader.module.scss";

const NAV_LINKS = [
  { href: "/", label: "Home", isActive: (pathname) => pathname === "/" },
  // Story lists, story pages and saved stories all count as "Stories"
  { href: "/story/all", label: "Stories", isActive: (pathname) => pathname.startsWith("/story") },
];

const SiteHeader = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const profile = useSelector(selectProfile);

  // undefined until the browser has read localStorage, then the token or null
  const token = useToken();
  const signedIn = Boolean(token);

  // The profile (and with it the plan) follows the session.
  useEffect(() => {
    if (token) dispatch(fetchProfile());
    else if (token === null) dispatch(profileCleared());
  }, [dispatch, token]);

  const handleLogout = () => {
    // The request carries the token so the API can revoke the session; this tab signs out
    // straight away either way.
    UserLogOutAPI(token).catch((error) => console.log(error));
    clearToken();
    router.replace("/");
  };

  const closeMobileMenu = () => setOpen(false);
  const currentFor = (href) => (pathname === href ? "page" : undefined);

  const logo = (
    <Link href="/" className={styles.logo}>
      MyStoryBank
    </Link>
  );

  // Password reset: the logo and a way back to sign-in
  if (pathname === "/forgotpassword") {
    return (
      <nav className={styles.navbar}>
        <div className={styles.inner}>
          {logo}
          <Link href="/signin" className={styles.loginBtn}>
            Login
          </Link>
        </div>
      </nav>
    );
  }

  // Sign-in: the logo only
  if (pathname === "/signin") {
    return (
      <nav className={styles.navbar}>
        <div className={styles.inner}>{logo}</div>
      </nav>
    );
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.inner}>
        {logo}

        {/* Desktop Menu */}
        <div className={styles.menu}>
          {NAV_LINKS.map(({ href, label, isActive }) => (
            <Link
              key={href}
              href={href}
              className={styles.link}
              aria-current={isActive(pathname) ? "page" : undefined}
            >
              {label}
            </Link>
          ))}

          {signedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger className={styles.avatar} aria-label="Account menu">
                {profile?.name?.charAt(0) || "U"}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User size={18} aria-hidden="true" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={handleLogout}>
                  <LogOut size={18} aria-hidden="true" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            token === null && (
              <Link href="/signin" className={styles.loginBtn}>
                Login
              </Link>
            )
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className={styles.mobileToggle}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div id="mobile-menu" className={styles.mobileMenu}>
          {NAV_LINKS.map(({ href, label, isActive }) => (
            <Link
              key={href}
              href={href}
              className={styles.mobileLink}
              aria-current={isActive(pathname) ? "page" : undefined}
              onClick={closeMobileMenu}
            >
              {label}
            </Link>
          ))}

          {signedIn ? (
            <>
              <Link
                href="/profile"
                className={styles.mobileLink}
                aria-current={currentFor("/profile")}
                onClick={closeMobileMenu}
              >
                <User size={16} aria-hidden="true" />
                Profile
              </Link>
              <button
                type="button"
                className={styles.mobileLink}
                onClick={() => {
                  handleLogout();
                  closeMobileMenu();
                }}
              >
                <LogOut size={16} aria-hidden="true" />
                Logout
              </button>
            </>
          ) : (
            token === null && (
              <Link href="/signin" className={styles.mobileLoginBtn} onClick={closeMobileMenu}>
                Login
              </Link>
            )
          )}
        </div>
      )}
    </nav>
  );
};

export default SiteHeader;
