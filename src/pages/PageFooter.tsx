import React from "react";
import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";

const PageFooter: React.FC = () => {
  return (
    <footer className="py-16 border-t border-border/20 bg-background" id="contact">
      <div className="container mx-auto px-4">
        {/* Main footer content */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {/* Company info */}
          <div className="lg:col-span-2">
            <h3 className="font-serif text-xl font-bold text-foreground mb-4">
              Koamishin<span className="text-primary">.</span>
              <span className="font-mono font-normal">org</span>
            </h3>
            <p className="text-muted-foreground mb-4 max-w-md">
              Bringing the beauty and artistry of Philippine flowers to your special moments.
              Handcrafted with love, delivered with care.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com/koamishin"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com/koamishin"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact Us</h4>
            <div className="space-y-3">
             
              <a
                href="mailto:balangtadv@gmail.com"
                className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="mr-2 h-4 w-4" />
                balangtadv@gmail.com
              </a>
              <div className="flex items-start text-sm text-muted-foreground">
                <MapPin className="mr-2 h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>
                  <br />
                  8752 Paseo de Roxas Street, <br />
                  San Miguel Village, Barangay Poblacion,<br />
                   Makati City, Metro Manila
                </span>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <div className="space-y-2">
              <a
                href="#about"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                About Us
              </a>
              <a
                href="#products"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Our Products
              </a>
              <a
                href="#services"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Services
              </a>
              <a
                href="#contact"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border/20 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-sans text-sm text-muted-foreground text-center sm:text-left">
            &copy; {new Date().getFullYear()} Koamishin.org. All rights reserved.
          </p>
          <p className="font-sans text-xs text-muted-foreground">
            Crafted with ❤️ in the Philippines
          </p>
        </div>
      </div>
    </footer>
  );
};

export default PageFooter;
