const sgMail = require("@sendgrid/mail")
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
module.exports.sendingEmail = async(message) => {
        const response = await sgMail.send(message);
        return response;
}