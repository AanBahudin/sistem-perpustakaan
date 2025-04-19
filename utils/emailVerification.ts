import sgMail from '@sendgrid/mail'
import compileEmailTemplate from './generateMail';
import { BadRequestError } from '../errors/errorHandler';

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string)

interface SendVerficationEmailProps {
  templateName: string,
  subject: string,
  to: string,
  emailData: object
}


const sendVerficationEmail = async({ templateName, subject, to, emailData }: SendVerficationEmailProps) => {

  // generate template email
  const templateEmail = await compileEmailTemplate(templateName, emailData)

  const emailMsg = {
    to,
    from: {
      email: 'perpustakaanteknikinformatika@gmail.com', // <- HARUS sudah diverifikasi
      name: 'Perpustakaan Teknik Informatika'
    },
    subject: subject,
    html: templateEmail
  };

  try {
    await sgMail.send(emailMsg);
  } catch (error) {
    throw new BadRequestError('Terjadi kesalahan');
  }
};
  

export default sendVerficationEmail