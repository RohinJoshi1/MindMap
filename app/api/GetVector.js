async function query(req) {
    const {messages} = await req.json()
	const response = await fetch(

		"https://api-inference.huggingface.co/models/SamLowe/roberta-base-go_emotions",
		{
			headers: { Authorization: "Bearer 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" },
			method: "POST",
			body: JSON.stringify(messages),
		}
	);
	const result = await response.json();
    const res = reduceCategoriesAndFormat(result);
    console.log(res);
	return res;
}
// query({ "inputs": "I like you. I love you" }).then((response) => {
// 	console.log(JSON.stringify(response));
// });


function findWeightedAverageOfEmotions(arrEmotions) {
	const weightedAverage = arrEmotions.reduce((acc, curr) => {
		return acc + curr.score * curr.weight;
	}, 0);
	return weightedAverage;
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
    
