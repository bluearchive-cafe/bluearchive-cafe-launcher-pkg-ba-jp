export default {
    async fetch(request, env) {
        const upstream = new URL(request.url);
        upstream.hostname = "launcher-pkg-ba-jp.yo-star.com";

        let response = await env.ASSETS.fetch(`${request.url}.00`);
        if (!response.ok) return Response.redirect(upstream, 302);

        const { readable, writable } = new TransformStream();
        (async () => {
            try {
                for (let i = 1; response.ok; i++) {
                    await response.body.pipeTo(writable, { preventClose: true });
                    response = await env.ASSETS.fetch(`${request.url}.${String(i).padStart(2, '0')}`);
                }
                await writable.close();
            } catch (e) { await writable.abort(e); }
        })();

        return new Response(readable);
    }
};
