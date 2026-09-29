import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { Menu, X, Search, User, LogOut } from "lucide-react";
import {
  SearchAPI,
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
  const [searchQuery, setSearchQuery] = useState("");
  const [openlist, setOpenlist] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
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

  const handleSearchApi = () => {
    setOpenlist(false);
    callAPI();
  };

  const keyPressHandler = (e) => {
    if (e.key === "Enter") {
      callAPI();
    }
  };

  const callAPI = () => {
    setOpenlist(false);
    SearchAPI(searchQuery).then((res) => {
      setOpenlist(true);
      setSearchResults(res.data);
    });
  };

  const handleRedirect = (id) => {
    const path = `/story-detail/${id}`;
    router.push(path);
    setSearchQuery("");
    setOpenlist(false);
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
            style={{ cursor: "pointer" }}
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
            style={{ cursor: "pointer" }}
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
          style={{ cursor: "pointer" }}
        >
          MyStoryBank
        </div>

     

        {/* Desktop Menu */}
        <div className={styles.menu}>
          <div onClick={() => handleNavigation("/")} className={styles.link}>
            Home
          </div>

          <div onClick={() => handleNavigation("/story/all")} className={styles.link}>
            Stories
          </div>

          {isClient && storedValue ? (
            <div style={{ position: "relative" }}>
              <button
                className={styles.avatar}
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "#C8232C",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                {profile?.name?.charAt(0) || "U"}
              </button>
              {showProfileMenu && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    right: "0",
                    backgroundColor: "white",
                    borderRadius: "8px",
                    boxShadow: "0px 2px 8px rgba(0,0,0,0.32)",
                    minWidth: "180px",
                    zIndex: 1000,
                    overflow: "hidden"
                  }}
                >
                  <div
                    className={styles.menuItem}
                    onClick={() => {
                      handleNavigation("/profile");
                      setShowProfileMenu(false);
                    }}
                    style={{
                      padding: "12px 16px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      transition: "background-color 0.2s"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f5f5f5"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "white"}
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
                    style={{
                      padding: "12px 16px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      transition: "background-color 0.2s"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f5f5f5"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "white"}
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