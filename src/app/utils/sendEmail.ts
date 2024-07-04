import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: 'md.tazwarul.islam.07@gmail.com',
    pass: 'kseq ckdr eilp zcat',
  },
});

export const sendEmail = async (link: string) => {
  await transporter.sendMail({
    from: 'md.tazwarul.islam.07@gmail.com', // sender address
    to: 'md.tazwarul.islam.07@gmail.com', // need to make dynamic
    subject: 'password reset link', // Subject line
    text: 'link will invalid within 10 mins', // plain text body
    html: `${link}`, // html body
  });
};
