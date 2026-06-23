import { fetch } from 'undici';
(async () => {
    try{
        const r = await fetch("http://localhost:3000/api/d1", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sql: "SELECT * FROM purchases order by created_at desc limit 10", params: [] })
        });
        const rs = await r.json();
        console.log(JSON.stringify(rs, null, 2));
    } catch(e) {
        console.error(e);
    }
})();
