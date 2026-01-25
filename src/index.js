export default {
    async fetch(request, env, ctx) {
        return Response.redirect(`https://launcher-pkg-ba-jp.yo-star.com${new URL(request.url).pathname}`, 302);
    },
};
