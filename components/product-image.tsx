import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { IMAGE_ORIGIN } from "@/lib/image-hosts";
import { BeeLogo } from "@/components/bee-logo";

const ALLOWED_ORIGINS = [
  IMAGE_ORIGIN,
  "https://store.storeimages.cdn-apple.com",
  "https://www.apple.com",
];

// Host lạ làm next/image throw đồng bộ (crash trang) → chỉ render ảnh từ origin hợp lệ
function isAllowedImageUrl(src: string): boolean {
  try {
    return ALLOWED_ORIGINS.includes(new URL(src).origin);
  } catch {
    return false;
  }
}

type Props = { src: string | null; alt: string; sizes: string; priority?: boolean };

export function ProductImage({ src, alt, sizes, priority }: Props) {
  return (
    <AspectRatio ratio={1} className="overflow-hidden rounded-xl bg-gradient-to-b from-neutral-100 to-neutral-200/80 flex items-center justify-center relative">
      {src && isAllowedImageUrl(src) ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 text-neutral-400 p-4 text-center select-none">
          <BeeLogo className="w-10 h-10 text-neutral-400/80" />
          <span className="text-[11px] font-medium text-neutral-500 line-clamp-1 max-w-[140px]">{alt}</span>
        </div>
      )}
    </AspectRatio>
  );
}
