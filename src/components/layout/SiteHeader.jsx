"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useIsClient } from "@/hooks/useIsClient";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { Menu, X, User, LogOut } from "lucide-react";
import { UserLogOutAPI } from "@/lib/api";
import { getLocalStorageItem, removeLocalStorageItem } from "@/lib/storage";
import { fetchProfile } from "@/store/slices/profileSlice";
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
  const [profile, setProfile] = useState(null);
  const isClient = useIsClient();

  const storedValue = getLocalStorageItem("UserLoginToken");
  const signedIn = isClient && Boolean(storedValue);

  useEffect(() => {
    if (storedValue) {
      dispatch(fetchProfile(storedValue))
        .then((res) => {
          setProfile(res?.payload);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [dispatch, storedValue]);

  const handleLogout = () => {
    removeLocalStorageItem("UserLoginToken");
    if (storedValue) {
      UserLogOutAPI()
        .then((res) => {
          router.replace("/");
        })
        .catch((error) => {
          router.replace("/");
          console.log(error);
        });
    }
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
            isClient && (
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
            isClient && (
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
