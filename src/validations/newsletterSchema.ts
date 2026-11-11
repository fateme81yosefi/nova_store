import * as yup from 'yup'

export type NewsletterValues = {
  email: string
}

export function newsletterSchema(message: string) {
  return yup.object({
    email: yup.string().trim().max(254, message).required(message).email(message),
  })
}
