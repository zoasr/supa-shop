export interface Env {
	VITE_PROJECT_URL: string;
	VITE_SUPABASE_KEY: string;
}
export default {
	async fetch(request, env) {
		const url = new URL(request.url);
        if(url.pathname === "/cron/") {

            const response = await fetch(
                `${env.VITE_PROJECT_URL}/rest/v1/products?select=category`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        apikey: env.VITE_SUPABASE_KEY,
                    },
                }
            );
            if (response.ok) {
                console.log(`hit the supabase ${env.VITE_PROJECT_URL} database successfully`);
            }

            return Response.json({
                message: `hit the supabase ${env.VITE_PROJECT_URL} database successfully`,
            });
        }
        return new Response("Not found", { status: 404 });
	},
    async scheduled(_, env) {
        const response = await fetch(
            `${env.VITE_PROJECT_URL}/rest/v1/products?select=category`,
            {
                headers: {
                    "Content-Type": "application/json",
                    apikey: env.VITE_SUPABASE_KEY,
                },
            }
        );
        if (response.ok) {
            console.log(`hit the supabase ${env.VITE_PROJECT_URL} database successfully`);
        }
    }
} satisfies ExportedHandler<Env>;
