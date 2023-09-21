async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/SamLowe/roberta-base-go_emotions",
		{
			headers: { Authorization: "Bearer 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" },
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return reduceCategoriesAndFormat(result);
}
// query({ "inputs": "I like you. I love you" }).then((response) => {
// 	console.log(JSON.stringify(response));
// });

function reduceCategoriesAndFormat(data) {
	const firstFourEntries = data[0].slice(0, 4);
	const formattedData = {};
	firstFourEntries.forEach((entry) => {
		formattedData[entry.label] = entry.score;
	});

	return formattedData;
}