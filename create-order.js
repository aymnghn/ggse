export default async function handler(req, res) {
  const { amount, description } = req.query;

  const clientId = process.env.AYb8FfXzrPCKiyxXzGtyGDiK4OouKRF3NEmyCIB3WdxsDQBICOcq5dGQUblS0oVa5RFPazOPJk7PUqIC;
  const secret = process.env.ECMbpOpCG0DjbM6TAgQ6cy9mtR1WzetLGpdfItv35B7GXyCZEqLwSQb_hlnjgbTYnD3XkVoZ06rrcEmB;

  const auth = Buffer.from(`${clientId}:${secret}`).toString('base64');

  // Create order on PayPal
  const response = await fetch("https://api-m.sandbox.paypal.com/v2/checkout/orders", {
    method: "POST",
    headers: {
      "Authorization": `Basic ${auth}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: { currency_code: "USD", value: amount },
          description: description || "GGSEL Product"
        }
      ],
      application_context: {
        return_url: "https://yourapp.vercel.app/api/order-status",
        cancel_url: "https://yourapp.vercel.app/cancel"
      }
    })
  });

  const data = await response.json();
  res.status(200).json(data);
}
