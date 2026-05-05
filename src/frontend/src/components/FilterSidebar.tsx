import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { CATEGORIES } from "@/types/product";
import type { FilterState } from "@/types/search";
import * as Slider from "@radix-ui/react-slider";
import { ChevronDown, ChevronUp, Star, X } from "lucide-react";
import { useState } from "react";

interface FilterSidebarProps {
  filterState: FilterState;
  onFilterChange: (updates: Partial<FilterState>) => void;
  availableBrands: string[];
  categoryCounts: Record<string, number>;
  brandCounts: Record<string, number>;
}

const STAR_KEYS = ["s1", "s2", "s3", "s4", "s5"];

const RATING_OPTIONS: { value: number; label: string }[] = [
  { value: 0, label: "Any" },
  { value: 3, label: "3 & Up" },
  { value: 4, label: "4 & Up" },
  { value: 4.5, label: "4.5 & Up" },
  { value: 5, label: "5 Stars" },
];

function Stars({ count }: { count: number }) {
  return (
    <span className="inline-flex gap-px">
      {STAR_KEYS.map((k, i) => (
        <Star
          key={k}
          className={`w-3.5 h-3.5 ${
            i < Math.floor(count)
              ? "fill-[#FF9900] text-[#FF9900]"
              : "fill-muted text-muted"
          }`}
        />
      ))}
    </span>
  );
}

function SectionHeader({
  label,
  open,
  onToggle,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-between py-2 text-sm font-semibold text-foreground hover:text-[#FF9900] transition-colors"
      onClick={onToggle}
    >
      {label}
      {open ? (
        <ChevronUp className="w-4 h-4" />
      ) : (
        <ChevronDown className="w-4 h-4" />
      )}
    </button>
  );
}

export function FilterSidebar({
  filterState,
  onFilterChange,
  availableBrands,
  categoryCounts,
  brandCounts,
}: FilterSidebarProps) {
  const [openSections, setOpenSections] = useState({
    category: true,
    price: true,
    brand: true,
    rating: true,
    stock: true,
  });
  const [showAllBrands, setShowAllBrands] = useState(false);
  const [priceMin, setPriceMin] = useState(String(filterState.minPrice));
  const [priceMax, setPriceMax] = useState(String(filterState.maxPrice));

  const toggleSection = (key: keyof typeof openSections) =>
    setOpenSections((s) => ({ ...s, [key]: !s[key] }));

  const toggleCategory = (cat: string) => {
    const next = filterState.categories.includes(cat)
      ? filterState.categories.filter((c) => c !== cat)
      : [...filterState.categories, cat];
    onFilterChange({ categories: next, page: 1 });
  };

  const toggleBrand = (brand: string) => {
    const next = filterState.brands.includes(brand)
      ? filterState.brands.filter((b) => b !== brand)
      : [...filterState.brands, brand];
    onFilterChange({ brands: next, page: 1 });
  };

  const applyPrice = () => {
    const min = Math.max(0, Number(priceMin) || 0);
    const max = Math.max(min, Number(priceMax) || 1000);
    onFilterChange({ minPrice: min, maxPrice: max, page: 1 });
  };

  const handleSliderChange = (values: number[]) => {
    setPriceMin(String(values[0]));
    setPriceMax(String(values[1]));
    onFilterChange({ minPrice: values[0], maxPrice: values[1], page: 1 });
  };

  const activeFilterTags = [
    ...filterState.categories.map((c) => ({
      label: c,
      onRemove: () => toggleCategory(c),
    })),
    ...filterState.brands.map((b) => ({
      label: b,
      onRemove: () => toggleBrand(b),
    })),
    ...(filterState.minPrice > 0 || filterState.maxPrice < 1000
      ? [
          {
            label: `$${filterState.minPrice}\u2013$${filterState.maxPrice}`,
            onRemove: () => {
              onFilterChange({ minPrice: 0, maxPrice: 1000 });
              setPriceMin("0");
              setPriceMax("1000");
            },
          },
        ]
      : []),
    ...(filterState.minRating > 0
      ? [
          {
            label: `${filterState.minRating}\u2605 & Up`,
            onRemove: () => onFilterChange({ minRating: 0, page: 1 }),
          },
        ]
      : []),
    ...(filterState.inStock
      ? [
          {
            label: "In Stock",
            onRemove: () => onFilterChange({ inStock: false, page: 1 }),
          },
        ]
      : []),
  ];

  const hasFilters = activeFilterTags.length > 0;
  const visibleBrands = showAllBrands
    ? availableBrands
    : availableBrands.slice(0, 5);

  return (
    <aside
      className="w-full bg-card border border-border rounded-lg p-4 sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto"
      data-ocid="filter.panel"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-foreground text-sm">Filters</h2>
        {hasFilters && (
          <button
            type="button"
            className="text-xs text-[#FF9900] hover:underline font-medium"
            onClick={() => {
              onFilterChange({
                categories: [],
                brands: [],
                minPrice: 0,
                maxPrice: 1000,
                minRating: 0,
                inStock: false,
                page: 1,
              });
              setPriceMin("0");
              setPriceMax("1000");
            }}
            data-ocid="filter.clear_all_button"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Active filter tags */}
      {hasFilters && (
        <div
          className="flex flex-wrap gap-1.5 mb-3"
          data-ocid="filter.active_tags"
        >
          {activeFilterTags.map((tag) => (
            <Badge
              key={tag.label}
              variant="secondary"
              className="flex items-center gap-1 text-xs px-2 py-0.5 bg-[#FF9900]/10 text-[#FF9900] border-[#FF9900]/30 hover:bg-[#FF9900]/20"
            >
              {tag.label}
              <button
                type="button"
                onClick={tag.onRemove}
                aria-label={`Remove ${tag.label} filter`}
              >
                <X className="w-2.5 h-2.5" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      <Separator className="mb-1" />

      {/* Category */}
      <div data-ocid="filter.category_section">
        <SectionHeader
          label="Category"
          open={openSections.category}
          onToggle={() => toggleSection("category")}
        />
        {openSections.category && (
          <div className="space-y-2 pb-3">
            {CATEGORIES.map((cat) => (
              <span
                key={cat}
                className="flex items-center gap-2.5 cursor-pointer group"
                data-ocid={`filter.category.${cat.toLowerCase()}`}
              >
                <Checkbox
                  id={`cat-cb-${cat}`}
                  checked={filterState.categories.includes(cat)}
                  onCheckedChange={() => toggleCategory(cat)}
                  className="data-[state=checked]:bg-[#FF9900] data-[state=checked]:border-[#FF9900]"
                />
                <label
                  htmlFor={`cat-cb-${cat}`}
                  className="text-sm text-foreground flex-1 group-hover:text-[#FF9900] transition-colors cursor-pointer"
                >
                  {cat}
                </label>
                {categoryCounts[cat] !== undefined && (
                  <span className="text-xs text-muted-foreground">
                    ({categoryCounts[cat]})
                  </span>
                )}
              </span>
            ))}
          </div>
        )}
      </div>

      <Separator className="mb-1" />

      {/* Price Range */}
      <div data-ocid="filter.price_section">
        <SectionHeader
          label="Price Range"
          open={openSections.price}
          onToggle={() => toggleSection("price")}
        />
        {openSections.price && (
          <div className="pb-3 space-y-3">
            <Slider.Root
              className="relative flex items-center select-none touch-none w-full h-5"
              value={[Number(priceMin), Number(priceMax)]}
              min={0}
              max={1000}
              step={5}
              onValueChange={handleSliderChange}
              data-ocid="filter.price_slider"
            >
              <Slider.Track className="bg-border relative grow rounded-full h-1.5">
                <Slider.Range className="absolute bg-[#FF9900] rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb
                className="block w-4 h-4 bg-[#FF9900] rounded-full shadow-md hover:bg-[#e68a00] focus:outline-none focus:ring-2 focus:ring-[#FF9900]/50 cursor-grab"
                aria-label="Minimum price"
              />
              <Slider.Thumb
                className="block w-4 h-4 bg-[#FF9900] rounded-full shadow-md hover:bg-[#e68a00] focus:outline-none focus:ring-2 focus:ring-[#FF9900]/50 cursor-grab"
                aria-label="Maximum price"
              />
            </Slider.Root>
            <div className="flex gap-2 items-center">
              <div className="relative flex-1">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                  $
                </span>
                <Input
                  type="number"
                  value={priceMin}
                  onChange={(e) => setPriceMin(e.target.value)}
                  onBlur={applyPrice}
                  className="pl-5 h-8 text-sm"
                  placeholder="Min"
                  data-ocid="filter.price_min_input"
                />
              </div>
              <span className="text-muted-foreground text-xs">&ndash;</span>
              <div className="relative flex-1">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                  $
                </span>
                <Input
                  type="number"
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value)}
                  onBlur={applyPrice}
                  className="pl-5 h-8 text-sm"
                  placeholder="Max"
                  data-ocid="filter.price_max_input"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <Separator className="mb-1" />

      {/* Brand */}
      <div data-ocid="filter.brand_section">
        <SectionHeader
          label="Brand"
          open={openSections.brand}
          onToggle={() => toggleSection("brand")}
        />
        {openSections.brand && (
          <div className="space-y-2 pb-3">
            {visibleBrands.map((brand) => (
              <span
                key={brand}
                className="flex items-center gap-2.5 cursor-pointer group"
                data-ocid={`filter.brand.${brand.toLowerCase().replace(/[^a-z0-9]/g, "_")}`}
              >
                <Checkbox
                  id={`brand-cb-${brand}`}
                  checked={filterState.brands.includes(brand)}
                  onCheckedChange={() => toggleBrand(brand)}
                  className="data-[state=checked]:bg-[#FF9900] data-[state=checked]:border-[#FF9900]"
                />
                <label
                  htmlFor={`brand-cb-${brand}`}
                  className="text-sm text-foreground flex-1 group-hover:text-[#FF9900] transition-colors cursor-pointer"
                >
                  {brand}
                </label>
                {brandCounts[brand] !== undefined && (
                  <span className="text-xs text-muted-foreground">
                    ({brandCounts[brand]})
                  </span>
                )}
              </span>
            ))}
            {availableBrands.length > 5 && (
              <button
                type="button"
                className="text-xs text-[#FF9900] hover:underline mt-1"
                onClick={() => setShowAllBrands((v) => !v)}
                data-ocid="filter.brand_show_more_button"
              >
                {showAllBrands
                  ? "Show Less"
                  : `+ ${availableBrands.length - 5} More Brands`}
              </button>
            )}
          </div>
        )}
      </div>

      <Separator className="mb-1" />

      {/* Minimum Rating */}
      <div data-ocid="filter.rating_section">
        <SectionHeader
          label="Minimum Rating"
          open={openSections.rating}
          onToggle={() => toggleSection("rating")}
        />
        {openSections.rating && (
          <div className="space-y-2 pb-3">
            {RATING_OPTIONS.map((opt) => (
              <label
                key={opt.value}
                className="flex items-center gap-2.5 cursor-pointer group"
                data-ocid={`filter.rating.${opt.value}`}
              >
                <input
                  type="radio"
                  name="minRating"
                  checked={filterState.minRating === opt.value}
                  onChange={() =>
                    onFilterChange({ minRating: opt.value, page: 1 })
                  }
                  className="accent-[#FF9900] w-3.5 h-3.5 cursor-pointer"
                />
                <span className="flex items-center gap-1.5 text-sm text-foreground group-hover:text-[#FF9900] transition-colors">
                  {opt.value > 0 ? (
                    <>
                      <Stars count={opt.value} />
                      <span className="text-muted-foreground">{opt.label}</span>
                    </>
                  ) : (
                    opt.label
                  )}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      <Separator className="mb-1" />

      {/* In Stock Only */}
      <div data-ocid="filter.stock_section">
        <SectionHeader
          label="Availability"
          open={openSections.stock}
          onToggle={() => toggleSection("stock")}
        />
        {openSections.stock && (
          <span
            className="flex items-center gap-2.5 pb-3 cursor-pointer group"
            data-ocid="filter.in_stock_toggle"
          >
            <Checkbox
              id="filter-in-stock"
              checked={filterState.inStock}
              onCheckedChange={(checked) =>
                onFilterChange({ inStock: !!checked, page: 1 })
              }
              className="data-[state=checked]:bg-[#FF9900] data-[state=checked]:border-[#FF9900]"
            />
            <label
              htmlFor="filter-in-stock"
              className="text-sm text-foreground group-hover:text-[#FF9900] transition-colors cursor-pointer"
            >
              In Stock Only
            </label>
          </span>
        )}
      </div>
    </aside>
  );
}
