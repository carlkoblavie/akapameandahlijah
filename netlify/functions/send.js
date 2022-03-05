const SibApiV3Sdk = require('sib-api-v3-sdk')
let defaultClient = SibApiV3Sdk.ApiClient.instance

const { SENDIN_BLUE_KEY, RECEPIENT } = process.env

let apiKey = defaultClient.authentications['api-key']
apiKey.apiKey = SENDIN_BLUE_KEY

let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi()

let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail()
exports.handler = function(event, context, callback) {
  try {
    const body = JSON.parse(event.body)

    const { firstName, lastName, email, message } = body
    const name = firstName + ' ' + lastName
    const html = `<html><body>
      From:
      <p>
      First name: ${firstName}
      Last name: ${lastName}
      Email: ${email}
      </p>
      <hr/>
      Message:
      </p>
      ${message}
      </p>
      </body></html>`

    sendSmtpEmail.subject = "Contact Us Message From Book Website"
    sendSmtpEmail.htmlContent = html
    sendSmtpEmail.sender = { "name": name, "email": email }
    sendSmtpEmail.to = [{ "email": RECEPIENT, "name": "Akapame & Ahlijah" }]
    sendSmtpEmail.replyTo = { "email": email, "name": name }

    return apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
      console.log('API called successfully. Returned data: ' + JSON.stringify(data))
    }, function(error) {
      console.error(error)
    })

  }
  catch (e) {
    callback(e.message, { statusCode: 400, body: `[ERROR] invalid JSON - ${e.message}` })
  }
}
