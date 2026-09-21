import './Contact.css';
import ContactForm from './ContactForm';

const Contact = () => {
  return (
    <main className="contact-page">
      <section className="contact-shell" aria-labelledby="contact-title">
        <div className="contact-heading">
          <h1 id="contact-title">Get In Touch</h1>
          <p>I'd love to hear from you. Let's build something amazing together!</p>
        </div>

        <div className="contact-layout">
          <ContactForm />

          <aside className="contact-info" aria-labelledby="contact-info-title">
            <h2 id="contact-info-title">Contact Info</h2>
            <dl>
              <div>
                <dt>Email:</dt>
                <dd><a href="mailto:pranavpatilg2004@gmail.com">pranavpatilg2004@gmail.com</a></dd>
              </div>
              <div>
                <dt>Phone:</dt>
                <dd><a href="tel:+917058454759">+91 7058454759</a></dd>
              </div>
              <div>
                <dt>Available at:</dt>
                <dd>Bhusawal, Maharashtra<br />Pune, Maharashtra</dd>
              </div>
            </dl>

            <h2 className="contact-social-title">My Socials</h2>
            <div className="contact-socials">
              <a href="https://www.linkedin.com/in/pranavpatil14/" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href="https://github.com/Lab-Dev-Pranav" target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://www.instagram.com/_dev.pranav____/" target="_blank" rel="noreferrer">Instagram</a>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default Contact;
