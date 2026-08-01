function DocIcon() {
  return (
    <svg viewBox="0 0 14 16" fill="none" aria-hidden="true">
      <path
        d="M8.4 1H3.2C2.5 1 2 1.6 2 2.2v11.6c0 .6.5 1.2 1.2 1.2h7.6c.7 0 1.2-.6 1.2-1.2V4.6L8.4 1Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path d="M8.2 1.3v3.4h3.6" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * The onboarding conversation, in the same phone frame as the client-side app
 * preview. It replaces a sentence that asked the reader to imagine the thing.
 *
 * This is drawn in 20fourr's own palette rather than as a WhatsApp
 * replica: outgoing bubbles are amber, incoming are the third ink tone. Two
 * reasons — copying another product's chrome would put a second brand's green
 * on a page that rations colour to one accent, and a mock that looks like a
 * real screenshot of WhatsApp implies an endorsement that does not exist.
 *
 * The glyph in the header is enough to say which app this is; the CTA directly
 * beside it says the rest.
 */
export default function ChatPreview({ chat, icon }) {
  return (
    <div className="phones phones--one" aria-hidden="true">
      <div className="phone">
        <div className="phone__screen">
          <div className="scr scr--chat">
            <div className="scr__bar">
              <span>9:41</span>
              <span className="scr__sig" />
            </div>

            <div className="chat__hd">
              <span className="chat__mark">{icon}</span>
              <span className="chat__who">
                {chat.who}
                <span className="chat__status">{chat.status}</span>
              </span>
            </div>

            <div className="chat__thread">
              {chat.rows.map((r, i) => (
                <div
                  className={`bub bub--${r.from}${r.ok ? ' bub--ok' : ''}${r.doc ? ' bub--doc' : ''}`}
                  key={i}
                >
                  {r.doc ? (
                    <>
                      <DocIcon />
                      {r.doc}
                    </>
                  ) : (
                    r.t
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
