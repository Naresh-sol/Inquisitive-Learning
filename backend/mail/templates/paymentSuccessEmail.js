exports.paymentSuccessEmail = (name, amount, orderId, paymentId) => {
    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Payment Successful</title>
        <style>
            body {
                background-color: #ffffff;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.4;
                color: #333333;
                margin: 0;
                padding: 0;
            }
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
            }
    
            .logo {
                max-width: 200px;
                margin-bottom: 20px;
            }
    
            .message {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 20px;
            }
    
            .body {
                font-size: 16px;
                margin-bottom: 20px;
            }
    
            .support {
                font-size: 14px;
                color: #999999;
                margin-top: 20px;
            }
    
            .highlight {
                font-weight: bold;
            }
        </style>
    
    </head>
    
    <body>
        <div class="container">
			<a href=""><img class="logo"
					src="https://res.cloudinary.com/b8rlupbs/image/upload/v1784985687/LearnHub/xbr0pgqrvybev2ws3w3s.png" alt="Inquisitive Learning Logo"></a>
            <div class="message">Payment Successful</div>
            <div class="body">
                <p>Dear ${name},</p>
                <p>We have successfully received your payment of <span class="highlight">₹${amount}</span>.</p>
                <p>Your Order ID is <span class="highlight">${orderId}</span> and Payment ID is <span class="highlight">${paymentId}</span>.</p>
            </div>
            <div class="support">If you have any questions or need assistance, please feel free to reach out to us at <a
					href="mailto:nareshsolanki1095@gmail.com">nareshsolanki1095@gmail.com</a>. We are here to help!</div>
        </div>
    </body>
    
    </html>`;
};
