export async function GET(_: Request) {
  const default_val = `User-agent: * \nDisallow: /`;
  try {
    const resp = ""; //@DESC: dynamically set later
    return new Response(resp || default_val, {
      status: 200,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (error) {
    return new Response(default_val, {
      status: 500,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}
