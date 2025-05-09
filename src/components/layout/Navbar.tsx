import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Find Doctor", path: "/find-doctor" },
  { name: "Diagnostics", path: "/diagnostics" },
  { name: "Symptoms", path: "/symptoms" },
  { name: "About", path: "/about" },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    closeMobileMenu();
  };

  const navigateToProfile = () => {
    navigate("/profile");
    closeMobileMenu();
  };

  const navigateToDashboard = () => {
    navigate("/dashboard");
    closeMobileMenu();
  };

  const getUserName = () => {
    if (profile) {
      return `${profile.first_name || ''} ${profile.last_name || ''}`.trim();
    }
    return "My Account";
  };

  const getUserRole = () => {
    if (profile) {
      const role = profile.role;
      return role.charAt(0).toUpperCase() + role.slice(1);
    }
    return "";
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-900 text-white backdrop-blur supports-[backdrop-filter]:bg-gray-900/90">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-healthcare-primary" />
          <span className="text-xl font-bold text-healthcare-primary">HealthLink</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-sm font-medium transition-colors hover:text-healthcare-primary text-gray-200"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="flex items-center gap-2">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden md:flex items-center gap-1 hover:text-white text-black border-gray-700 hover:bg-gray-800"
                >
                  <User className="h-4 w-4 mr-1" />
                  {getUserName()}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>{getUserName()}</DropdownMenuLabel>
                <DropdownMenuLabel className="text-xs text-muted-foreground">{getUserRole()}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={navigateToDashboard}>
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={navigateToProfile}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button
                variant="outline"
                size="sm"
                className="hidden md:flex items-center gap-1 hover:text-white text-black border-gray-700 hover:bg-gray-800"
                asChild
              >
                <Link to="/login">
                  <User className="h-4 w-4 mr-1" />
                  Sign In
                </Link>
              </Button>
              <Button
                size="sm"
                className="hidden md:flex bg-healthcare-primary hover:bg-healthcare-accent"
                asChild
              >
                <Link to="/register">Sign Up</Link>
              </Button>
            </>
          )}

          {/* Mobile Menu Toggle */}
        <Button
  variant="ghost"
  size="icon"
  className="md:hidden text-gray-200 z-[10000] hover:bg-gray-500"
  onClick={toggleMobileMenu}
  aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
>
  {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
</Button>
        </div>
      </div>

     {/* MOBILE MENU */}
{/* MOBILE MENU */}
{isMobileMenuOpen && (
  <>
    {/* FULL SCREEN OVERLAY */}
    <div
      className="fixed inset-0 z-[9998] bg-black/70 backdrop-blur-sm"
      onClick={closeMobileMenu}
    ></div>

    {/* SLIDING MENU PANEL - height adjusts to content */}
   
             {/* SLIDING MENU PANEL */}
<div className="fixed top-16 right-0 w-3/4 max-w-xs z-[9999] bg-gray-900 text-white flex flex-col rounded-tl-lg shadow-xl overflow-hidden">
  {/* No internal close button anymore */}

  {/* Navigation Links */}
  <nav className="px-4 space-y-1 border-b border-gray-800">
    {navLinks.map((link) => (
      <Link
        key={link.path}
        to={link.path}
        className="block py-3 px-3 text-base font-medium text-white hover:text-healthcare-primary border-b border-gray-800"
        onClick={closeMobileMenu}
      >
        {link.name}
      </Link>
    ))}

    {user && (
      <Link
        to="/dashboard"
        className="block py-3 px-3 text-base font-medium text-white hover:text-healthcare-primary border-b border-gray-800"
        onClick={closeMobileMenu}
      >
        Dashboard
      </Link>
    )}
  </nav>

  {/* Auth Buttons / Footer */}
  <div className="p-4 space-y-3">
    {user ? (
      <>
        <Button
          variant="outline"
          className="w-full justify-center text-black border-gray-700 hover:bg-gray-800 hover:text-white"
          onClick={navigateToProfile}
        >
          <User className="h-4 w-4 mr-2 " />
          Profile
        </Button>
        <Button
          variant="destructive"
          className="w-full justify-center"
          onClick={handleSignOut}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </>
    ) : (
      <>
        <Button
          variant="outline"
          className="w-full justify-center text-gray-100 border-gray-700 hover:bg-gray-800 hover:text-white"
          asChild
        >
          <Link to="/login" onClick={closeMobileMenu}>
            <User className="h-4 w-4 mr-2" />
            Sign In
          </Link>
        </Button>
        <Button
          className="w-full justify-center bg-healthcare-primary hover:bg-healthcare-accent"
          asChild
        >
          <Link to="/register" onClick={closeMobileMenu}>
            Sign Up
          </Link>
        </Button>
      </>
    )}
  </div>
</div>
  </>
)}
    </header>
  );
};

export default Navbar;