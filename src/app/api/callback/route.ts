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

  const token   = tokenData.access_token
  const content = JSON.stringify({ token, provider: "github" })

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Authentification</title>
</head>
<body>
<script>
(function() {
  var opener = window.opener;
  if (!opener) { window.close(); return; }

  function onMessage(e) {
    if (e.data === "authorizing:github" || (typeof e.data === "string" && e.data.indexOf("authorizing") !== -1)) return;
    window.removeEventListener("message", onMessage);
    opener.postMessage(
      "authorization:github:success:${content}",
      window.location.origin
    );
    setTimeout(function() { window.close(); }, 500);
  }

  window.addEventListener("message", onMessage);
  opener.postMessage("authorizing:github", window.location.origin);

  // Fallback : envoyer directement si le CMS ne répond pas dans 2s
  setTimeout(function() {
    opener.postMessage(
      "authorization:github:success:${content}",
      window.location.origin
    );
    setTimeout(function() { window.close(); }, 500);
  }, 2000);
})();
</script>
<p style="font-family:sans-serif;text-align:center;margin-top:3rem">
  Authentification en cours&hellip;
</p>
</body>
</html>`

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  })
}
