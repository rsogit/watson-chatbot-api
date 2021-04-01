const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');
const cors = require('cors');

const assistant = new AssistantV2({
    version: '2020-09-24',
    authenticator: new IamAuthenticator({
        apikey: 'OyoX6p_02CJC3MuSXeXVK6UlOmqWXio9pkur8iE9hosI',
    }),
    serviceUrl: 'https://api.us-south.assistant.watson.cloud.ibm.com/instances/774c129b-9d76-4fa7-a358-84eb5ef40646',
});

const express = require('express');
const { response } = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static('./public'))
app.use(cors())

const port = 3000;
let session_id;

assistant.createSession({
    assistantId: '20fb953c-5235-4856-9cfe-40bf9087d1d8'
})
    .then(res => {
        session_id = (res.result.session_id);
    })
    .catch(err => {
        console.log(err);
    });

app.get('/conversation/:text*?', (req, res) => {
    const { text } = req.params;

    res.json(text);
});

app.post('/conversation/', (req, response) => {
    const { text, context = {} } = req.body;
    assistant.message({
        assistantId: '20fb953c-5235-4856-9cfe-40bf9087d1d8',
        sessionId: `${session_id}`,
        input: {
          'message_type': 'text',
          'text': text
          }
        })
        .then(res => {
          response.send(res.result);
        })
        .catch(err => {
            console.log(err);
        });
});

app.listen(port, () => console.log(`Running on port ${port}`));