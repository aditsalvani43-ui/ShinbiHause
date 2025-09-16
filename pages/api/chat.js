export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body;

  try {
    const openaiRes = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // atau gpt-5 nanti kalau sudah ada
        input: messages.map(m => `${m.role}: ${m.content}`).join('\n')
      })
    });

    const data = await openaiRes.json();
    const reply = data.output_text || data.choices?.[0]?.message?.content || 'AI tidak membalas';

    res.status(200).json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Terjadi kesalahan' });
  }
                                   }
