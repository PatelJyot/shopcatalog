import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/useCart";
import { CATEGORIES } from "@/types/product";
import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Search, ShoppingCart, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const { totalItems } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      void navigate({ to: "/products", search: { q: searchQuery.trim() } });
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border shadow-xs">
      {/* Top bar */}
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex-shrink-0 font-display font-bold text-xl text-foreground hover:text-accent transition-colors duration-200"
          data-ocid="header.logo_link"
        >
          Shop<span className="text-accent">Central</span>
        </Link>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="flex-1 flex items-center max-w-2xl"
        >
          <div className="relative flex w-full">
            <Input
              type="search"
              placeholder="Search for products, brands, or categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-r-none border-r-0 h-10 focus-visible:ring-accent"
              data-ocid="header.search_input"
            />
            <Button
              type="submit"
              className="rounded-l-none h-10 bg-accent hover:bg-accent/90 text-accent-foreground px-4"
              data-ocid="header.search_button"
            >
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </form>

        {/* Cart */}
        <Link
          to="/cart"
          className="relative flex items-center gap-2 text-foreground hover:text-accent transition-colors duration-200 flex-shrink-0"
          data-ocid="header.cart_link"
        >
          <div className="relative">
            <ShoppingCart className="w-6 h-6" />
            {totalItems > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-accent text-accent-foreground text-xs rounded-full">
                {totalItems > 99 ? "99+" : totalItems}
              </Badge>
            )}
          </div>
          <span className="hidden sm:inline text-sm font-medium">Cart</span>
        </Link>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="md:hidden text-foreground"
          onClick={() => setMobileMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          data-ocid="header.mobile_menu_toggle"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Category nav */}
      <nav className="hidden md:block bg-muted/40 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-1 h-10">
          <Link
            to="/products"
            className="px-3 py-1 text-sm font-medium text-foreground hover:text-accent hover:bg-accent/10 rounded transition-colors duration-200"
            data-ocid="header.nav_all_link"
          >
            All
          </Link>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              to="/products"
              search={{ category: cat }}
              className="px-3 py-1 text-sm font-medium text-foreground hover:text-accent hover:bg-accent/10 rounded transition-colors duration-200"
              data-ocid={`header.nav_${cat.toLowerCase()}_link`}
            >
              {cat}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <nav
          className="md:hidden bg-card border-t border-border"
          data-ocid="header.mobile_menu"
        >
          <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col gap-1">
            <Link
              to="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-foreground hover:text-accent rounded transition-colors duration-200"
            >
              All Products
            </Link>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat}
                to="/products"
                search={{ category: cat }}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-foreground hover:text-accent rounded transition-colors duration-200"
              >
                {cat}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
