import Image from 'next/image';

/**
 * A real client-app screen, presented as a device.
 *
 * The images in /public/app are high-res captures of the actual app screens
 * (deepNavy theme, live copy) — no stock, no redraw. They already carry the
 * status bar and home indicator, so this frame only adds the bezel, the ring
 * and the drop shadow that make a flat PNG read as a handset. Every screen is
 * 751×1522, so one aspect ratio holds the frame steady whatever the src.
 *
 * The sample data inside the screens ("Rajveer Singh", review counts) is
 * representative of the flow, never presented as a real booking — captions
 * around each frame say "how the flow works", not "our customers".
 */
export default function PhoneFrame({ src, alt, priority = false, className = '', sizes = '(max-width: 700px) 74vw, 300px' }) {
  return (
    <div className={`pf ${className}`}>
      <div className="pf__bezel">
        <Image
          className="pf__img"
          src={src}
          alt={alt}
          width={751}
          height={1522}
          priority={priority}
          sizes={sizes}
        />
      </div>
    </div>
  );
}
