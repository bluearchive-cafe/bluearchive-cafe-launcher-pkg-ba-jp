export default {
  async fetch(request, env, ctx) {
    const pathname = new URL(request.url).pathname;
    const filename = pathname.split("/").pop();

    if (filename === "resources.assets") {
      const object = await env.DOWNLOAD.get(filename);
      if (object) return new Response(object.body);
    }

    return Response.redirect(`https://launcher-pkg-ba-jp.yo-star.com${pathname}`,302);
  },
};
