const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { OpenAI } = require("openai");

const openai = new OpenAI({apiKey:"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"});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/chat', async (req, res) => {
    const { prompt } = req.body;

    const completion = await openai.createCompletion({
        engine: "text-davinci-003",
        max_tokens: 512,
        temperature: 0,
        prompt: prompt,
    });

    res.send(completion.data.choices[0].text);
})

const port = 8080;
app.listen(port, () => {
    console.log(`server is listening on port ${port} `)
})