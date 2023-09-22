
export async function POST(req) {
    const {messages} = await req.json()
    console.log(messages)
    const modelUrl = "https://api-inference.huggingface.co/models/SamLowe/roberta-base-go_emotions"
	const response = await fetch(modelUrl, {
        headers: {
          Authorization: `Bearer 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`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ inputs: messages }),
      });
	const result = await response.json();
    const res = reduceCategoriesAndFormat(result)
    const _res = JSON.stringify(res)
    // console.log(result)
    // console.log("ROAHSDOFn")
    // console.log(res)
    return new Response(_res, {
        headers: {
          "Content-Type": "application/json", // Adjust the content type based on the actual audio format
        },
      });
    //   return JSON.stringify(res)
    
//   return result
}
function reduceCategoriesAndFormat(data) {

    const firstFourEntries = data[0].slice(0, 4);
    const formattedData = {};
    firstFourEntries.forEach((entry) => {
        formattedData[entry.label] = entry.score;
    });

    return formattedData;
}
// async function POST(req: Request) {
//       // Extract the `messages` from the body of the request
//       const { messages } = await req.json();
//       const res = query(messages)



      

    
// }


// async function POST(req: Request) {
    //   // Extract the `messages` from the body of the request
    //   const { messages } = await req.json();
    
    //   const response = Hf.textGenerationStream({
    //     model: 'OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5',
    //     inputs: experimental_buildOpenAssistantPrompt(messages),
    //     parameters: {
    //       max_new_tokens: 200,
    //       // @ts-ignore (this is a valid parameter specifically in OpenAssistant models)
    //       typical_p: 0.2,
    //       repetition_penalty: 1,
    //       truncate: 1000,
    //       return_full_text: false,
    //     },
    //   });
    
