Enter your email on these lines
1. https://github.com/tuffant21/raspberry_pi_4_locator_bot/blob/160a526c6af79415c433b499cd0a614d7052ef0d/app.js#L33
2. https://github.com/tuffant21/raspberry_pi_4_locator_bot/blob/160a526c6af79415c433b499cd0a614d7052ef0d/app.js#L41

Generate an app password at this [url](https://myaccount.google.com/apppasswords?pli=1&rapt=AEjHL4N8K0BqsxXdy4f7WAcowqCjxcQ6mQ9vNyVTc27wzTdZhUsbBbdmSk_KSjSHqfO0gr6tJqPetn_Ac0Y9G9BR4znxHrNEKw)

Put that password in place of this line
https://github.com/tuffant21/raspberry_pi_4_locator_bot/blob/160a526c6af79415c433b499cd0a614d7052ef0d/app.js#L34

Determine your sms gateway
* AT&T: txt.att.net | mms.att.net
* Boost Mobile: sms.myboostmobile.com | myboostmobile.com
* Cricket Wireless: txt.att.net | mms.att.net
* Mint Mobile: tmomail.net
* Project Fi: msg.fi.google.com
* T-Mobile: tmomail.net
* US Cellular: email.uscc.net | mms.uscc.net
* Verizon Wireless: vtext.com | vzwpix.com | mypixmessages.com

Put the corresponding gateway after the @ symbol on this
https://github.com/tuffant21/raspberry_pi_4_locator_bot/blob/160a526c6af79415c433b499cd0a614d7052ef0d/app.js#L15

Enter your phone number before the @ symbol on this
https://github.com/tuffant21/raspberry_pi_4_locator_bot/blob/160a526c6af79415c433b499cd0a614d7052ef0d/app.js#L15

Build the docker image
docker build -t alert .
