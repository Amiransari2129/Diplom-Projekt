import nodemailer from 'nodemailer';

const sendEmail = (options) => {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.PROV_USER,
			pass: process.env.PROV_PASS
		},
	});

	const setMailContent = {
		from: process.env.PROV_USER,
		to: options.to,
		subject: options.subject,
		html: options.body
	}

	transporter.sendMail(setMailContent, (error) => {
		if (error) {
			console.log('Error Sending the mail: ' + error);
		}
	})
}

export default sendEmail;