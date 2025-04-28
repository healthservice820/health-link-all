
import React from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-healthcare-primary" />
              <span className="text-xl font-bold text-healthcare-primary">HealthLink</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Connecting patients, doctors, diagnostics, and pharmacies in one integrated platform.
            </p>
          </div>
          
          <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/find-doctor" className="text-sm text-muted-foreground hover:text-healthcare-primary">
                    Find Doctors
                  </Link>
                </li>
                <li>
                  <Link to="/diagnostics" className="text-sm text-muted-foreground hover:text-healthcare-primary">
                    Lab Tests
                  </Link>
                </li>
                <li>
                  <Link to="/symptoms" className="text-sm text-muted-foreground hover:text-healthcare-primary">
                    Symptom Checker
                  </Link>
                </li>
                <li>
                  <Link to="/pharmacies" className="text-sm text-muted-foreground hover:text-healthcare-primary">
                    Pharmacies
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-sm text-muted-foreground hover:text-healthcare-primary">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="text-sm text-muted-foreground hover:text-healthcare-primary">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-sm text-muted-foreground hover:text-healthcare-primary">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/press" className="text-sm text-muted-foreground hover:text-healthcare-primary">
                    Press
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/privacy" className="text-sm text-muted-foreground hover:text-healthcare-primary">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-sm text-muted-foreground hover:text-healthcare-primary">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/cookies" className="text-sm text-muted-foreground hover:text-healthcare-primary">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} HealthLink. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs text-muted-foreground hover:text-healthcare-primary">
              Privacy
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-healthcare-primary">
              Terms
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-healthcare-primary">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
