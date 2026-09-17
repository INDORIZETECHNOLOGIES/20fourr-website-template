#!/usr/bin/env node
/**
 * Submits every URL in the live sitemap to IndexNow, so Bing/Yandex (and
 * anything else on the shared IndexNow endpoint) pick up new or changed
 * provider/facet pages faster than waiting on organic re-crawl. Google has no
 * equivalent — this doesn't affect Google indexing at all.
 *
 * The key below must match the key file served at
 * https://20fourr.com/<key>.txt (see public/<key>.txt in this repo) — that
 * file is what proves to IndexNow that whoever is submitting actually
 * controls this domain.
 *
 * Run manually: `npm run indexnow`
 * Or wire into a Netlify post-deploy build hook once you're ready to
 * automate this — that's a deploy-pipeline change intentionally left for you
 * to opt into rather than made silently here.
 */

const HOST = 'https://20fourr.com';
const KEY = '8e00f30e0efedf4e35724833b0fb2ae9';
const KEY_LOCATION = `${HOST}/${KEY}.txt`;

async function main() {
  const res = await fetch(`${HOST}/sitemap.xml`);
  if (!res.ok) {
    throw new Error(`Couldn't fetch ${HOST}/sitemap.xml: HTTP ${res.status}`);
  }
  const xml = await res.text();
  const urlList = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) =>
    m[1].replace(/&amp;/g, '&')
  );

  if (urlList.length === 0) {
    throw new Error('No <loc> entries found in the sitemap — refusing to submit an empty list.');
  }

  const body = { host: new URL(HOST).host, key: KEY, keyLocation: KEY_LOCATION, urlList };

  const submitRes = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  });

  // IndexNow returns 200/202 on success, 400/403/422/429 on various rejections —
  // see https://www.indexnow.org/documentation for the exact meaning of each.
  console.log(`Submitted ${urlList.length} URLs — IndexNow responded HTTP ${submitRes.status}`);
  if (!submitRes.ok) {
    const text = await submitRes.text().catch(() => '');
    console.error(text);
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exitCode = 1;
});
