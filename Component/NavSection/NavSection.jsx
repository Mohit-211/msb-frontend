import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { Menu, X, User, LogOut } from "lucide-react";
import {
  UserLogOutAPI,
  getLocalStorageItem,
  removeLocalStorageItem,
} from "@/Constants/Api/Api";
import { getClinetProfile } from "@/redux/getClientProfileSlice";
import styles from "./NavSection.module.scss";

const NavBar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const storedValue = getLocalStorageItem("UserLoginToken");

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (storedValue) {
      dispatch(getClinetProfile(storedValue))
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

  const handleNavigation = (path) => {
    router.push(path);
    setOpen(false);
  };

  // Render login button for forgot password page
  if (isClient && router.asPath === "/forgotpassword") {
    return (
      <nav className={styles.navbar}>
        <div className={styles.inner}>
          <div
            onClick={() => router.push("/")}
            className={styles.logo}
          >
            MyStoryBank
          </div>
          <button
            className={styles.loginBtn}
            onClick={() => router.push("/signin")}
          >
            Login
          </button>
        </div>
      </nav>
    );
  }

  // Don't render navigation on signin page
  if (isClient && router.asPath === "/signin") {
    return (
      <nav className={styles.navbar}>
        <div className={styles.inner}>
          <div
            onClick={() => router.push("/")}
            className={styles.logo}
          >
            MyStoryBank
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.inner}>
        {/* Logo */}
        <div
          onClick={() => router.push("/")}
          className={styles.logo}
        >
          MyStoryBank
        </div>

        {/* Desktop Menu */}
        <div className={styles.menu}>
          <div onClick={() => handleNavigation("/")} className={styles.link}>
            Home
          </div>

          <div
            onClick={() => handleNavigation("/story/all")}
            className={styles.link}
          >
            Stories
          </div>

          {isClient && storedValue ? (
            <div className={styles.profile}>
              <button
                className={styles.avatar}
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                {profile?.name?.charAt(0) || "U"}
              </button>
              {showProfileMenu && (
                <div className={styles.profileMenu}>
                  <div
                    className={styles.menuItem}
                    onClick={() => {
                      handleNavigation("/profile");
                      setShowProfileMenu(false);
                    }}
                  >
                    <User size={18} />
                    Profile
                  </div>
                  <div
                    className={styles.menuItem}
                    onClick={() => {
                      handleLogout();
                      setShowProfileMenu(false);
                    }}
                  >
                    <LogOut size={18} />
                    Logout
                  </div>
                </div>
              )}
            </div>
          ) : (
            isClient && (
              <button
                className={styles.loginBtn}
                onClick={() => handleNavigation("/signin")}
              >
                Login
              </button>
            )
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className={styles.mobileToggle}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className={styles.mobileMenu}>
          <div
            className={styles.mobileLink}
            onClick={() => handleNavigation("/")}
          >
            Home
          </div>

          <div
            className={styles.mobileLink}
            onClick={() => handleNavigation("/story/all")}
          >
            Stories
          </div>

          {isClient && storedValue ? (
            <>
              <div
                className={styles.mobileLink}
                onClick={() => handleNavigation("/profile")}
              >
                <User size={16} />
                Profile
              </div>
              <div
                className={styles.mobileLink}
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
              >
                <LogOut size={16} />
                Logout
              </div>
            </>
          ) : (
            isClient && (
              <button
                className={styles.mobileLoginBtn}
                onClick={() => handleNavigation("/signin")}
              >
                Login
              </button>
            )
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
