const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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" ,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {

    const { messages } = req.body.messages;
    console.log(req);
    try {
      const result = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt:getPrompt(messages),
        max_tokens: 150,
        n: 1,
        stop: null,
        temperature: 0.5,
      });

      res.status(200).json(result.data.choices[0].text);
   
    } catch (error) {
      console.error('Error in API:', error);
      res.status(500).json({ message: 'An error occurred while processing the request.', error: error.message });
    }

}
function getPrompt(message) {
    {
        return `The following text delimited by three quotes is a journal entry from a user.
        You are an excellent therapist with a talent for helping people talk more about themselves. 
        Ask a thoughtful follow up question to the journal entry while keeping in mind what has been said before.
        """${message}"""
        `;
      }
}