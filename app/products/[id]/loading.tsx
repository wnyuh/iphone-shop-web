import { Skeleton } from "@/components/ui/skeleton";

// Hiện trong lúc Server Component chờ Rails (Next tự bọc Suspense quanh page)
export default function Loading() {
  return (
    <main className="container mx-auto px-6 py-10">
      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <Skeleton className="aspect-square w-full" />
        <div className="space-y-4">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
    </main>
  );
}
