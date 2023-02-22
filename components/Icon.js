/* Next API */
import Image from 'next/image';

export default function Icon({ className, src, width, height, alt, quality }) {
  return (
    <Image
      className={className}
      src={src}
      width={width}
      height={height}
      alt={alt}
      quality={quality}
    />
  );
}
