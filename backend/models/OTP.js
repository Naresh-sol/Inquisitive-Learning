const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');
const emailTemplate = require('../mail/templates/emailVerificationTemplate');

const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 5 * 60, // The document will be automatically deleted after 5 minutes of its creation time
    }
});

//  function to send email
async function sendVerificationEmail(email, otp, name) {
    try {
        const displayName = name || email.split('@')[0].split('.').map(part => part.replace(/\d+/g, '')).join(' ');
        const mailResponse = await mailSender(email, 'OTP Verification Email', emailTemplate(otp, displayName));
        if (mailResponse) {
            console.log('Email sent successfully to - ', email);
        } else {
            console.log('Failed to send verification email to - ', email);
        }
    }
    catch (error) {
        console.log('Error while sending an email to ', email, error);
    }
}

// pre middleware
OTPSchema.pre('save', async function (next) {
    // console.log("New document saved to database");

    // Only send an email when a new document is created
    if (this.isNew) {
        sendVerificationEmail(this.email, this.otp, this.name);
    }
    next();
});

module.exports = mongoose.model('OTP', OTPSchema);