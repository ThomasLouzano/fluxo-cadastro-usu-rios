import { IMailProvider, IMessage } from "../IMailProvider";
import nodemailer from 'nodemailer'
import Mail from "nodemailer/lib/mailer";


export class MailtrapMailProvider implements IMailProvider{
  private transporter: Mail;

  
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: '9f533bb9f26c02',
        pass: '0ba8bcc6658034'
      }
    })
  }

  async sendMail(message: IMessage): Promise<void> {
    await this.transporter.sendMail({
      to: {
        name: message.to.name,
        address: message.to.email,
      },
      from:{
        name: message.from.name,
        address: message.from.email,
      },
      subject: message.subject,
      html: message.body,
    }) 
  }
}