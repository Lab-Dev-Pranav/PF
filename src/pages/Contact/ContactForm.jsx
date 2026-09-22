import { useState } from 'react';
import './ContactForm.css';


// const ContactForm = () => {
//   const [status, setStatus] = useState({ type: '', message: '' });
//   const [isSending, setIsSending] = useState(false);



//   return (
//     <section className="contact-form-panel" aria-label="Send a message">
//       <form className="contact-form" onSubmit={handleSubmit} action="https://api.web3forms.com/submit" method="POST">
//          <input type="hidden" name="access_key" value="3b76c54f-a140-4921-ae7c-91a21e8a04f9"></input>

//         <label htmlFor="contact-name">Your Name</label>
//         <input id="contact-name" name="fromName" type="text" placeholder="Enter your name" className="form-input" required />

//         <label htmlFor="contact-email">Your Email</label>
//         <input id="contact-email" name="fromEmail" type="email" placeholder="Enter your email" className="form-input" required />

//         <label htmlFor="contact-message">Your Message</label>
//         <textarea id="contact-message" name="message" placeholder="Write your message..." rows="5" className="form-input" required />

//         <button type="submit" className="submit-btn" disabled={isSending}>
//           {isSending ? 'Sending...' : 'Send Message'}
//         </button>

//         {/* {status.message ? <p className={`contact-form__status contact-form__status--${status.type}`} role="status">{status.message}</p> : null} */}
//       </form>
//     </section>
//   );
// };

// export default ContactForm;


export default function ContactForm() {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("access_key", "3b76c54f-a140-4921-ae7c-91a21e8a04f9");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    setResult(data.success ? "Success!" : "Error");
  };

  return (
    <section className="contact-form-panel" aria-label="Send a message">
      <form className="contact-form" onSubmit={onSubmit}>

          <label htmlFor="contact-name">Your Name</label>
        <input id='contact-name' type="text" name="name" className="form-input" required />

          <label htmlFor="contact-email">Your Email</label>
        <input id="contact-email" type="email" name="email" className="form-input" required />

          <label htmlFor="contact-message">Your Message</label>
        <textarea id="contact-message" name="message" className="form-input" required></textarea>
        <button type="submit" className="submit-btn">
          Submit
        </button>
        <p>{result}</p>
      </form>
    </section>
  );
}