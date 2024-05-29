/* eslint-disable max-len */
import { Request, Response } from 'express';
import { logger } from 'firebase-functions/v1';
import { Recipient, EmailParams, MailerSend, Sender } from 'mailersend';
import { EmailData, EmailTemplateType } from '../../utils/email.handler';

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
		const emailData: EmailData = req.body;

		// Build from
		let sender: Sender;
		if (!emailData.fromName) {
			sender = new Sender('info@from.thinkless.com.br', 'Thinkless');
		} else {
			sender = new Sender(
				`${emailData.fromName.prefix || 'info'}@from.thinkless.com.br` ||
					'Thinkless',
				emailData.fromName.name || 'Thinkless'
			);
		}

		// Build recipients
		const recipients: Recipient[] = emailData.destination
			? emailData.destination.split(',').map((email) => new Recipient(email))
			: [new Recipient('caiocaio0022@gmail.com')];
		// const recipients: Recipient[] = [new Recipient('caiocaio0022@gmail.com')];

		let template: string;
		if (emailData.templateType === EmailTemplateType.REQUEST_TEMPLATE) {
			template = emailData.template || 'default';
		} else if (emailData.templateType === EmailTemplateType.DYNAMIC) {
			// Lidar com o template dinâmico com o templateData
			template = `<h1> Template dinamico! </h1>`;
		} else {
			template = `<h1> Template desconhecido! </h1>`;
		}

		const emailParams = new EmailParams()
			.setFrom(sender)
			.setTo(recipients)
			.setSubject(emailData.subject || 'Mensagem de Thinkless')
			.setHtml(template)
			.setText(
				'Email não carregado corretamente. Entre em contato com a administração do app'
			);

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
