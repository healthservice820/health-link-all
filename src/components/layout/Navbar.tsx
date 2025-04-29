
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Find Doctor", path: "/find-doctor" },
    { name: "Diagnostics", path: "/diagnostics" },
    { name: "Symptoms", path: "/symptoms" },
    { name: "About", path: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-900 text-white backdrop-blur supports-[backdrop-filter]:bg-gray-900/90">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-healthcare-primary" />
            <span className="text-xl font-bold text-healthcare-primary">HealthLink</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
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

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="hidden md:flex items-center gap-1 text-gray-100 border-gray-700 hover:bg-gray-800"
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

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-gray-200 hover:bg-gray-800"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={cn(
          "md:hidden fixed inset-0 top-16 z-50 bg-gray-900 flex flex-col p-6 transition-transform duration-300",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-base font-medium transition-colors hover:text-healthcare-primary text-gray-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="mt-4 flex flex-col gap-2">
            <Button
              variant="outline"
              className="w-full justify-center text-gray-100 border-gray-700 hover:bg-gray-800"
              asChild
            >
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Link>
            </Button>
            <Button
              className="w-full justify-center bg-healthcare-primary hover:bg-healthcare-accent"
              asChild
            >
              <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                Sign Up
              </Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
