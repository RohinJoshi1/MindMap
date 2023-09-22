import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

export async function POST(req) {
  
  const journal = req.body.messages || "";

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(journal),
      temperature: 0.6, // consider adjusting this
      max_tokens: 1000,
    });
    
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}

function generatePrompt(journal) {
  return `The following text delimited by three quotes is a journal entry from a user.
  You are an excellent therapist with a talent for helping people talk more about themselves. 
  Ask a thoughtful follow up question to the journal entry while keeping in mind what has been said before.
  """${journal}"""
  `;
}
