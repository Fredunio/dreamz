// import * as jwt from 'jsonwebtoken'
// import transporter from './transporter'

// export function tokenizeEmail(
//     user_email: string,
//     email_secret: string,
//     user_id: string
// ) {
//     jwt.sign(
//         {
//             user: user_id,
//         },
//         email_secret,
//         {
//             expiresIn: '1d',
//         },
//         (err, emailToken) => {
//             const url = `http://localhost:3000/verifyEmail/${emailToken}`

//             transporter.sendMail({
//                 to: user_email,
//                 subject: 'Confirm Email',
//                 html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
//             })
//         }
//     )
// }
