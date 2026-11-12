# Deploying Shift Log (notes for the next session)

Everything in this folder is the finished site (v5.0.0, tested). Publish it as-is.

- Repo: shiftlog-911app/shift-log (public, created by Jason; only a README in it as of Nov 12).
- Jason's yes covers only: a public repo plus publishing via GitHub Pages. Nothing else.
- Layout: root = officers' app (/shift-log/), beta/ = Jason's test app (/shift-log/beta/). Keep .nojekyll.
- Our README.md replaces the repo's starter README.
- DEPLOY.md (this file) can go in the repo or be left out.

Steps:
1. add_repo shiftlog-911app/shift-log with access "push". Clone it.
2. Copy this folder's contents (including hidden .nojekyll) into the clone root, commit, push to main.
3. Turn on Pages: source = main branch, folder = / (root). For example:
   gh api -X POST repos/shiftlog-911app/shift-log/pages -f "source[branch]=main" -f "source[path]=/"
4. Wait for the build, then check at a phone-size screen:
   https://shiftlog-911app.github.io/shift-log/ and https://shiftlog-911app.github.io/shift-log/beta/
   (Beta shows a red BETA bar. The two keep separate logs and separate offline caches.)
5. Give Jason both links exactly as GitHub shows them, with plain tap-by-tap steps (Safari > Share > Add to Home Screen).
   The officers' link goes out only on his word. New features go to beta/ first.

Moving his v4 stats: re-read the v4 artifact db (https://claude.ai/artifact/R2Z7P2k88AEjWf9QPgkQ6T, collections logs/, shifts/, meta/shift)
with ArtifactData, build a backup JSON {app:"shift-log", format:1, version:"5.0.0", exportedAt, data:{v:1, logs, shift, shifts}}
(log docs keep their shape), and attach it. Jason restores it in the app: Backup & your data > Restore a backup.

Rules: no police or incident data in Notion or any cloud; charge types only. Never rename internal category keys.

Known blocker (Nov 12, 07:45-08:20 UTC): pushes from the first session were refused with
"Claude doesn't have GitHub access to shiftlog-911app/shift-log". Jason installed the Claude GitHub App and went
through the reconnect page (no Authorize button showed). If a fresh session gets the same refusal, it isn't a
stale-session problem, and the install itself needs checking.
