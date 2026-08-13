import { ImageResponse } from 'next/og';

/* The default social-share card for every page (WhatsApp / X / LinkedIn).
   Generated at build time — deepNavy ground, gold accent, the hero promise.
   No external assets, so it needs no font files or network at build. */

export const alt = 'A verified guard on your gate this week — 20fourr, verified private security in India';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#060C16',
          color: '#EDF1F6',
          padding: '72px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', width: '16px', height: '46px', background: '#E8A020' }} />
          <div style={{ display: 'flex', fontSize: '42px', fontWeight: 700, letterSpacing: '3px' }}>20FOURR</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: '78px', fontWeight: 800, lineHeight: 1.04, maxWidth: '960px' }}>
            A verified guard on your gate this week.
          </div>
          <div style={{ display: 'flex', marginTop: '28px', fontSize: '32px', color: '#92A0A6' }}>
            PSARA-verified security, priced upfront.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '26px' }}>
          <div style={{ display: 'flex', color: '#E8A020', fontWeight: 700 }}>Find Security &rarr;</div>
          <div style={{ display: 'flex', color: '#5C6A70' }}>· Guards · Bouncers · Armed · PSOs · across India</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
