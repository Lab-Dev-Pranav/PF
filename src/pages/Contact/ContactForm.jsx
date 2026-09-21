import { useState } from 'react';
import emailjs from '@emailjs/browser';
import './ContactForm.css';

const EMAILJS_SERVICE_ID = 'service_05uzerb';
const EMAILJS_TEMPLATE_ID = 'template_zt4s6tb';
const EMAILJS_PUBLIC_KEY = '4mzJkxJLR0IvSOnCb';

const ContactForm = () => {
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    setIsSending(true);
    setStatus({ type: '', message: '' });

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.get('fromName'),
          from_email: formData.get('fromEmail'),
          message: formData.get('fromMsg')
        },
        EMAILJS_PUBLIC_KEY
      );

      form.reset();
      setStatus({ type: 'success', message: 'Message sent successfully.' });
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus({ type: 'error', message: 'Message could not be sent. Please try again.' });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="contact-form-panel" aria-label="Send a message">
      <form className="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="contact-name">Your Name</label>
        <input id="contact-name" name="fromName" type="text" placeholder="Enter your name" className="form-input" required />
        <label htmlFor="contact-email">Your Email</label>
        <input id="contact-email" name="fromEmail" type="email" placeholder="Enter your email" className="form-input" required />
        <label htmlFor="contact-message">Your Message</label>
        <textarea id="contact-message" name="fromMsg" placeholder="Write your message..." rows="5" className="form-input" required />
        <button type="submit" className="submit-btn" disabled={isSending}>
          {isSending ? 'Sending...' : 'Send Message'}
        </button>
        {status.message ? <p className={`contact-form__status contact-form__status--${status.type}`} role="status">{status.message}</p> : null}
      </form>
    </section>
  );
};

export default ContactForm;
