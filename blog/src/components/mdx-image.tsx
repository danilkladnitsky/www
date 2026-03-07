import Image from "next/image";

type ImgProps = React.ComponentPropsWithoutRef<"img">;

export function MdxImage({ src, alt = "", className }: ImgProps) {
  if (!src || typeof src !== "string") return null;

  return (
    <span className="block w-full my-6">
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={675}
        className={`w-full h-auto object-contain rounded-md ${className ?? ""}`}
        style={{ width: "100%", height: "auto" }}
        sizes="100vw"
      />
    </span>
  );
}
