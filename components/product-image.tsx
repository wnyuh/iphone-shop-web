import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

// Phải khớp next.config.ts remotePatterns — next/image throw đồng bộ (crash trang) nếu host lạ
const ALLOWED_IMAGE_HOSTS = ["placehold.co"];
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
