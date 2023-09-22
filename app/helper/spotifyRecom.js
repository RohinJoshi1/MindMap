
// Manual Input

var input = {
    "disappointment": 0.504,
    "sadness": 0.347,
    "annoyance": 0.085
}

input = {
    "love": 0.6,
    "neutral": 0.4
}

export default function getFrequencies(input, MaxMusic = 20) {

    const emotionToFrequencyMapping = {
        "disappointment": [852],  // 852 Hz for replacing negative thoughts
        "sadness": [528],         // 528 Hz for healing and stress reduction
        "annoyance": [432],       // 432 Hz for calming
        "neutral": [432, 852],    // 432 Hz for calming, and 852 Hz for positive thinking
        "disapproval": [639],     // 639 Hz for promoting love and harmony
        "realization": [741],     // 741 Hz for problem-solving and self-expression
        "nervousness": [852],     // 852 Hz for reducing nervousness and anxiety
        "approval": [639],        // 639 Hz for promoting love and understanding
        "joy": [432],             // 432 Hz for calming
        "anger": [432, 639, 852], // 432 Hz for calming, 639 Hz for promoting love and understanding, and 852 Hz for positive thinking
        "embarrassment": [396],   // 396 Hz for removing fears and anxiety
        "caring": [852],          // 852 Hz for promoting caring and positive thinking
        "remorse": [396],         // 396 Hz for removing fears and anxiety
        "disgust": [639],         // 639 Hz for promoting love and understanding
        "grief": [],              // 528 Hz for healing and stress reduction
        "confusion": [741],       // 741 Hz for problem-solving and self-expression
        "relief": [432, 396],     // 432 Hz for calming and 396 Hz for removing fears and worries
        "desire": [528],          // 528 Hz for healing and desire
        "admiration": [639],      // 639 Hz for promoting love and understanding
        "optimism": [432, 396, 852],  // 432 Hz for calming, 396 Hz for optimism, and 852 Hz for positive thinking
        "fear": [396],            // 396 Hz for removing fears and anxiety
        "love": [432, 639],       // 432 Hz for calming and 639 Hz for promoting love and harmony
        "excitement": [852],      // 852 Hz for excitement and positive thinking
        "curiosity": [741],       // 741 Hz for problem-solving and self-expression
        "amusement": [432],       // 432 Hz for calming
        "surprise": [432],        // 432 Hz for calming
        "gratitude": [639],       // 639 Hz for promoting love and understanding
        "pride": [639],           // 639 Hz for promoting love and understanding
    }

    var total = Object.keys(input).reduce((total, key) => total + input[key], 0)
    var normalizedInput = Object.keys(input).reduce((normalizedInput, key) => {
        normalizedInput[key] = input[key] / total
        return normalizedInput
    }, {})


    var musicNums = {}
    Object.keys(normalizedInput).forEach((emotion) => {
        musicNums[emotion] = Math.round(normalizedInput[emotion] * MaxMusic)
    })

    // Get the frequencies for each emotion

    var frequencyNums = {}
    Object.keys(musicNums).forEach((emotion) => {
        var frequencies = emotionToFrequencyMapping[emotion]
        var numMusic = Math.round(musicNums[emotion]/frequencies.length)
        frequencies.forEach((frequency) => {
            if (frequency in frequencyNums) {
                frequencyNums[frequency] += numMusic
            } else {
                frequencyNums[frequency] = numMusic
            }
        })
    })

    return frequencyNums
}



