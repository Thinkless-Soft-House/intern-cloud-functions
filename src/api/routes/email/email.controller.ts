/* eslint-disable max-len */
import { Request, Response } from 'express';
import { logger } from 'firebase-functions/v1';
import { Recipient, EmailParams, MailerSend, Sender } from 'mailersend';

const EMAIL_API_KEY =
	process.env.EMAIL_API_KEY ||
	'mlsn.dd9919cb2d5964f3ce28438179ae29a920b4bd0f9b02e59e7f868ae03cffa654';

const mailerSend = new MailerSend({
	apiKey: EMAIL_API_KEY,
});
/**
 * Retorna uma saudação.
 *
 * @param {any} req - O objeto de solicitação.
 * @param {any} res - O objeto de resposta.
 * @return {string} A saudação.
 */
export function hello(req: Request, res: Response) {
	return res.send('Hello from Email route!');
}

/**
 * Sends an email.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @return {Promise<object>} The result of sending the email.
 */
export async function sendEmail(req: Request, res: Response) {
	try {
		const recipients: Recipient[] = req.body.recipient
			? [new Recipient(req.body.recipient)]
			: [new Recipient('caiocaio0022@gmail.com')];
		const sender: Sender = new Sender(
			'info@from.thinkless.com.br',
			'Thinkless'
		);
		const emailParams = new EmailParams()
			.setFrom(sender)
			.setTo(recipients)
			.setSubject('Teste de envio de email')
			.setHtml('<h1>Teste de envio de email</h1>')
			.setText('This is the text content');

		const sent = await mailerSend.email.send(emailParams);

		res.json({
			ok: true,
			logs: sent,
		});
	} catch (error) {
		logger.error(error);
		res.status(500).json({
			ok: false,
			logs: error,
		});
	}
}
