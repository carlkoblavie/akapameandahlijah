const SibApiV3Sdk = require('sib-api-v3-sdk')
let defaultClient = SibApiV3Sdk.ApiClient.instance

const { SENDIN_BLUE_KEY } = process.env

let apiKey = defaultClient.authentications['api-key']
apiKey.apiKey = SENDIN_BLUE_KEY

let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi()

let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail()
exports.handler = function(event, context, callback) {
  try {
    body = JSON.parse(event.body)

    sendSmtpEmail.subject = "Contact Us Message From Book Website"
    sendSmtpEmail.htmlContent = "<html><body><h1>testing mic</h1></body></html>"
    sendSmtpEmail.sender = { "name": "John Doe", "email": "example@example.com" }
    sendSmtpEmail.to = [{ "email": "cskoblavie@gmail.com", "name": "Akapame & Ahlijah" }]
    sendSmtpEmail.replyTo = { "email": "replyto@domain.com", "name": "John Doe" }
    sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" }
    sendSmtpEmail.params = { "parameter": "My param value", "subject": "New Subject" }

    apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
      console.log('API called successfully. Returned data: ' + JSON.stringify(data))
    }, function(error) {
      console.error(error)
    })

  }
  catch (e) {
    callback(e.message, { statusCode: 400, body: `[ERROR] invalid JSON - ${e.message}` })
  }
}
