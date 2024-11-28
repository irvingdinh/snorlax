'use server';

import axios from 'axios';
import FormData from 'form-data';

export class RecaptchaService {
  static async verify(gCaptchaResponse: string): Promise<void> {
    const url = 'https://www.google.com/recaptcha/api/siteverify';

    const form = new FormData();
    form.append('secret', process.env.RECAPTCHA_SECRET_KEY);
    form.append('response', gCaptchaResponse);

    const { data } = await axios.post(url, form, {
      headers: {
        ...form.getHeaders(),
      },
    });

    if (!data.success) {
      throw new Error(
        `reCAPTCHA verification is failed (${data['error-codes'] !== undefined ? data['error-codes'] : 'unknown'})`,
      );
    }
  }
}
