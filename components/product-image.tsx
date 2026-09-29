import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ALLOWED_IMAGE_HOSTS } from "@/lib/image-hosts";

// Host lạ làm next/image throw đồng bộ (crash trang) → chỉ render host trong danh sách dùng chung với next.config.ts
function isAllowedImageUrl(src: string): boolean {
  try {
    return ALLOWED_IMAGE_HOSTS.includes(new URL(src).hostname);
  } catch {
    return false;
  }
}

type Props = { src: string | null; alt: string; sizes: string; priority?: boolean };

export function ProductImage({ src, alt, sizes, priority }: Props) {
  return (
    <AspectRatio ratio={1} className="overflow-hidden rounded-lg bg-muted">
      {src && isAllowedImageUrl(src) ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <div className="flex h-full items-center justify-center text-sm text-muted-foreground">Chưa có ảnh</div>
      )}
    </AspectRatio>
  );
}
