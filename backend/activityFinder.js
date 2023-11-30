require('dotenv').config(); // Load environment variables from .env file
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateActivities(partyName) {
  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: `What are the best activities for a ${partyName} party?` },
      ],
      model: 'gpt-3.5-turbo',
    });
    // Log the response
    const resultText = chatCompletion.choices[0].message.content;
    return resultText;
  } catch (error) {
    console.error('Error:', error);
    return '';
  }
}

module.exports = generateActivities;
