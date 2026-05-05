import { CATEGORIES } from "@/types/product";
import { Link } from "@tanstack/react-router";

const COMPANY_LINKS = [
  "About us",
  "Careers",
  "Press",
  "Privacy Policy",
  "Return Policy",
];
const RESOURCE_LINKS = ["Blog", "Discounts", "FAQs", "Contact us"];

export default function Footer() {
  const year = new Date().getFullYear();
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;

  return (
    <footer className="bg-card border-t border-border mt-12">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Company */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">
              Company
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {COMPANY_LINKS.map((link) => (
                <li key={link}>
                  <span className="hover:text-accent transition-colors duration-200 cursor-pointer">
                    {link}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">
              Resources
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {RESOURCE_LINKS.map((link) => (
                <li key={link}>
                  <span className="hover:text-accent transition-colors duration-200 cursor-pointer">
                    {link}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">
              Categories
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {CATEGORIES.map((cat) => (
                <li key={cat}>
                  <Link
                    to="/products"
                    search={{ category: cat }}
                    className="hover:text-accent transition-colors duration-200"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">
              About Info
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              ShopCentral is the place to discover unique products from top
              brands and modern collections. Free shipping on orders over $49.
            </p>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-sm text-muted-foreground">
            &copy; {year} ShopCentral. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with love using{" "}
            <a
              href={utmLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
