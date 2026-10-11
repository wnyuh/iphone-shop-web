"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CategoryFilter } from "@/components/category-filter";
import { ProductGrid } from "@/components/product-grid";
import { SearchInput } from "@/components/search-input";
import { SortSelect } from "@/components/sort-select";
import { CATEGORIES, SORT_OPTIONS } from "@/lib/api";

const ALL = "__all__";

export function ProductCatalog() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Validate giá trị đọc từ URL: link cũ/sửa tay có thể mang giá trị không hợp lệ
  const rawCategory = searchParams.get("category") ?? "";
  const category = (CATEGORIES as readonly string[]).includes(rawCategory) ? rawCategory : "";
  const rawSort = searchParams.get("sort") ?? "featured";
  const sort = SORT_OPTIONS.some((o) => o.value === rawSort) ? rawSort : "featured";

  // Ghi category/sort lên URL; giá trị mặc định → xoá param. `q` KHÔNG đi qua đây.
  const setParam = useCallback(
      (key: "category" | "sort", value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value && value !== ALL && value !== "featured") params.set(key, value);
        else params.delete(key);
        const qs = params.toString();
        router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
      },
      [router, pathname, searchParams],
  );

  // Tìm kiếm: state cục bộ, KHÔNG lên URL. Chỉ gửi request sau khi ngừng gõ 300ms
  const [q, setQ] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQ(q.trim()), 300);
    return () => clearTimeout(timer);
  }, [q]);

  return (
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <CategoryFilter categories={CATEGORIES} value={category || ALL} onChange={(v) => setParam("category", v)} />
          <SearchInput value={q} onChange={setQ} />
          <SortSelect value={sort} onChange={(v) => setParam("sort", v)} />
        </div>
        <ProductGrid
            key={`${category}|${sort}`}
            category={category || undefined}
            sort={sort}
            q={debouncedQ}
            onClearSearch={() => setQ("")}
        />
      </div>
  );
}
