const { ContactsApi, CreateContact, ApiClient } = require('sib-api-v3-sdk')

const { SENDIN_BLUE_KEY, LIST_ID } = process.env

const defaultClient = ApiClient.instance

const auth = defaultClient.authentications['api-key']
auth.apiKey = SENDIN_BLUE_KEY

const apiInstance = new ContactsApi()
const createContact = new CreateContact()

exports.handler = function(event, context, callback) {
  try {
    const body = JSON.parse(event.body)
    const { email } = body

    createContact.listIds = [LIST_ID]
    createContact.email = email

    return apiInstance.createContact(createContact).then(function(data) {
      console.log('API called successfully. Returned data: ' + JSON.stringify(data))
    }, function(error) {
      console.error(error)
    })
  }
  catch (e) {
    return callback(e.message, { statusCode: 400, body: `[ERROR] invalid JSON - ${e.message}` })
  }
}
