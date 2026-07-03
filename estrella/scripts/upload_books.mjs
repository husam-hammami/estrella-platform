// Upload the four paid digital-edition books into the PRIVATE Supabase `books`
// bucket, using the catalog file names the app serves signed URLs for.
//
// Run (from the estrella project root; the source HTML files must exist locally
// at the Assets/Books/* paths below):
//
//   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node scripts/upload_books.mjs
//
// Zero dependencies (Node 18+ global fetch). Uses the Supabase Storage REST API
// (POST /storage/v1/object/books/<name>) with the service-role key + upsert, so
// re-running overwrites in place. Prints one OK/FAIL line per file.

import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('FAIL: set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in the environment.');
  process.exit(1);
}

// __dirname for ESM, then resolve the repo root (scripts/ is one level down).
const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// local source file  ->  object name in the `books` bucket (matches lib/api.js catalog)
const MAP = [
  ['Assets/Books/Quiet_Power_Digital_Edition.html',           'quiet.html'],
  ['Assets/Books/Career_Compass_Digital_Edition.html',        'compass.html'],
  ['Assets/Books/The_Interview_Playbook_Digital_Edition.html', 'interview.html'],
  ['Assets/Books/The_Reset_Journal_Digital_Edition.html',      'reset.html'],
];

const base = SUPABASE_URL.replace(/\/$/, '');

let failures = 0;
for (const [srcRel, objectName] of MAP) {
  const srcPath = join(ROOT, srcRel);
  try {
    const bytes = await readFile(srcPath);
    const resp = await fetch(`${base}/storage/v1/object/books/${objectName}`, {
      method: 'POST',
      headers: {
        apikey: SERVICE_KEY,
        Authorization: `Bearer ${SERVICE_KEY}`,
        'Content-Type': 'text/html',
        'x-upsert': 'true',
      },
      body: bytes,
    });
    if (resp.ok) {
      console.log(`OK   books/${objectName}  (${bytes.length} bytes  <- ${srcRel})`);
    } else {
      failures += 1;
      const text = await resp.text().catch(() => '');
      console.error(`FAIL books/${objectName}  ${resp.status}  ${text}`);
    }
  } catch (e) {
    failures += 1;
    console.error(`FAIL books/${objectName}  ${e && e.message}  (source: ${srcPath})`);
  }
}

if (failures) {
  console.error(`\n${failures} file(s) failed.`);
  process.exit(1);
}
console.log('\nAll 4 books uploaded to the private `books` bucket.');
