import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const code = searchParams.get("code")

  if (!code) {
    return NextResponse.json({ error: "No authorization code provided" }, { status: 400 })
  }

  const clientId     = process.env.GITHUB_CLIENT_ID
  const clientSecret = process.env.GITHUB_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    return NextResponse.json({ error: "GitHub OAuth not configured" }, { status: 500 })
  }

  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { "Accept": "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
  })

  const tokenData = await tokenRes.json()

  if (tokenData.error) {
    return NextResponse.json({ error: tokenData.error_description ?? tokenData.error }, { status: 400 })
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

  const html = `<!DOCTYPE html>
<html>
<head><title>Authentification réussie</title></head>
<body>
<script>
(function() {
  function receiveMessage(e) {
    if (e.origin !== ${JSON.stringify(siteUrl)}) return;
    e.source.postMessage(
      "authorization:github:success:" + JSON.stringify({ token: ${JSON.stringify(tokenData.access_token)}, provider: "github" }),
      e.origin
    );
  }
  window.addEventListener("message", receiveMessage, false);
  if (window.opener) window.opener.postMessage("authorizing:github", ${JSON.stringify(siteUrl)});
  setTimeout(() => window.close(), 5000);
})();
</script>
<p>Authentification réussie. Cette fenêtre va se fermer automatiquement.</p>
</body>
</html>`

  return new NextResponse(html, { headers: { "Content-Type": "text/html" } })
}
