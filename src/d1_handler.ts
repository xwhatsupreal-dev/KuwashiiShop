// D1 API Proxy
export async function handleD1Query(req: any, res: any) {
  try {
    let { sql, params } = req.body;
    
    // Cloudflare D1 requires params to be passed but doesn't support complex substitutions sometimes, but it does support ? bindings!
    const accountId = process.env.CF_ACCOUNT_ID;
    const dbId = process.env.CF_DATABASE_ID;
    const token = process.env.CF_API_TOKEN;

    if (!accountId || !dbId || !token) {
      throw new Error("CF credentials not configured in settings");
    }

    const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${dbId}/query`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ sql, params: params || [] })
    });

    const data = await response.json();
    if (!data.success) {
      console.error("D1 Error response:", data.errors);
      return res.status(400).json({ error: data.errors });
    }
    
    const resultArr = data.result && data.result[0] ? data.result[0].results : [];
    res.json({ data: resultArr });
  } catch (err: any) {
    console.error("D1 Proxy Error:", err);
    res.status(500).json({ error: err.message });
  }
}
