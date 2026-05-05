import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/useCart";
import { useSearchSuggestions } from "@/hooks/useProducts";
import { CATEGORIES } from "@/types/product";
import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Search, ShoppingCart, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Header() {
  const { totalItems } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  // Debounce: update debouncedQuery 300ms after typing stops
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data: suggestions = [] } = useSearchSuggestions(debouncedQuery);

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional reset
  useEffect(() => {
    setActiveIndex(-1);
  }, [suggestions]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (activeIndex >= 0 && suggestions[activeIndex]) {
      setShowDropdown(false);
      setSearchQuery("");
      void navigate({
        to: "/product/$id",
        params: { id: String(suggestions[activeIndex].id) },
      });
    } else if (searchQuery.trim()) {
      setShowDropdown(false);
      void navigate({ to: "/search", search: { q: searchQuery.trim() } });
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!showDropdown || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === "Escape") {
      setShowDropdown(false);
      setActiveIndex(-1);
    }
  }

  function handleSuggestionClick(product: import("@/types/product").Product) {
    setShowDropdown(false);
    setSearchQuery("");
    void navigate({ to: "/product/$id", params: { id: String(product.id) } });
  }

  const hasQuery = debouncedQuery.trim().length >= 2;
  const showNoResults = hasQuery && suggestions.length === 0;

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

        {/* Search with dropdown */}
        <div
          ref={containerRef}
          className="flex-1 flex items-center max-w-2xl relative"
        >
          <form onSubmit={handleSearch} className="flex w-full">
            <Input
              type="search"
              placeholder="Search for products, brands, or categories..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowDropdown(e.target.value.trim().length >= 2);
              }}
              onFocus={() => {
                if (searchQuery.trim().length >= 2) setShowDropdown(true);
              }}
              onKeyDown={handleKeyDown}
              className="rounded-r-none border-r-0 h-10 focus-visible:ring-accent"
              data-ocid="header.search_input"
              autoComplete="off"
            />
            <Button
              type="submit"
              className="rounded-l-none h-10 bg-accent hover:bg-accent/90 text-accent-foreground px-4"
              data-ocid="header.search_button"
            >
              <Search className="w-4 h-4" />
            </Button>
          </form>

          {/* Suggestions dropdown */}
          {showDropdown && hasQuery && (
            <div
              className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-md shadow-lg z-50 overflow-hidden"
              data-ocid="header.suggestions_dropdown"
            >
              {showNoResults ? (
                <div className="px-4 py-3 text-sm text-muted-foreground">
                  No suggestions for &ldquo;{debouncedQuery}&rdquo;
                </div>
              ) : (
                <div aria-label="Search suggestions">
                  {suggestions.map((product, idx) => {
                    const isActive = idx === activeIndex;
                    const displayPrice = product.salePrice ?? product.price;
                    const stars =
                      "★".repeat(Math.round(product.rating)) +
                      "☆".repeat(5 - Math.round(product.rating));
                    return (
                      <div
                        key={String(product.id)}
                        onMouseDown={() => handleSuggestionClick(product)}
                        onMouseEnter={() => setActiveIndex(idx)}
                        className={`flex items-center gap-3 px-3 py-2 cursor-pointer transition-colors duration-150 border-b border-border last:border-0 ${
                          isActive ? "bg-accent/10" : "hover:bg-accent/5"
                        }`}
                        data-ocid={`header.suggestion.${idx + 1}`}
                      >
                        {/* Thumbnail */}
                        <div className="w-10 h-10 flex-shrink-0 rounded overflow-hidden bg-muted">
                          {product.images[0] ? (
                            <img
                              src={product.images[0]}
                              alt={product.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-muted">
                              <Search className="w-4 h-4 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {product.title}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs text-accent font-semibold">
                              {new Intl.NumberFormat("en-IN", {
                                style: "currency",
                                currency: "INR",
                                maximumFractionDigits: 0,
                              }).format(displayPrice)}
                            </span>
                            <span
                              className="text-xs text-muted-foreground"
                              aria-label={`${product.rating} stars`}
                            >
                              {stars}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

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
              to="/category/$name"
              params={{ name: cat }}
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
                to="/category/$name"
                params={{ name: cat }}
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
