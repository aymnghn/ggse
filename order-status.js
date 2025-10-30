export default async function handler(req, res) {
  const { token } = req.query;
  if (!token) return res.status(400).send("Missing token");

  const clientId = process.env.AYb8FfXzrPCKiyxXzGtyGDiK4OouKRF3NEmyCIB3WdxsDQBICOcq5dGQUblS0oVa5RFPazOPJk7PUqIC;
  const secret = process.env.ECMbpOpCG0DjbM6TAgQ6cy9mtR1WzetLGpdfItv35B7GXyCZEqLwSQb_hlnjgbTYnD3XkVoZ06rrcEmB;
  const auth = Buffer.from(`${clientId}:${secret}`).toString('base64');

  const capture = await fetch(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${token}/capture`, {
    method: "POST",
    headers: {
      "Authorization": `Basic ${auth}`,
      "Content-Type": "application/json"
    }
  });

  const result = await capture.json();
  res.status(200).json(result);
}
