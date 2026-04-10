import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  orientation?: 'horizontal' | 'vertical';
  theme?: 'dark' | 'light';
  width?: number;
}

export function Logo({
  orientation = 'horizontal',
  theme = 'dark',
  width,
}: LogoProps) {
  const filename = `images/asgen-${orientation}-${theme}.svg`;

  const defaultWidth = orientation === 'vertical' ? 120 : 180;
  const defaultHeight = orientation === 'vertical' ? '15vh' : '2.5rem';
  const aspectRatio = orientation === 'vertical' ? '1/1.2' : '4/1';

  return (
    <Link href="/" className="inline-block">
      <Image
        src={filename}
        alt={`ASGEN Logo ${orientation} ${theme}`}
        width={width || defaultWidth}
        height={0}
        style={{
          width: 'auto',
          height: defaultHeight,
          aspectRatio: aspectRatio,
        }}
        priority
      />
    </Link>
  );
}
