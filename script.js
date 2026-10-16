function app() {
  return {
    dark: false,
    mm: false,
    sc: false,
    s: 'hero',

    init() {
      // dark mode
      this.dark = localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
      this.$watch('dark', v => localStorage.setItem('theme', v ? 'dark' : 'light'));

      // scroll
      window.addEventListener('scroll', () => {
        this.sc = window.scrollY > 20;
        this.updateSection();
      }, { passive: true });

      // reveal
      const io = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
      document.querySelectorAll('.reveal').forEach(el => io.observe(el));

      // year
      document.getElementById('yr').textContent = new Date().getFullYear();
    },

    updateSection() {
      const atBottom = (window.innerHeight + window.scrollY) >= document.body.scrollHeight - 60;
      if (atBottom) { this.s = 'contact'; return; }
      const ids = ['contact','blog','reviews','about','work','services','hero'];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 130) { this.s = id; return; }
      }
    }
  }
}

// 1. Initialize EmailJS with your Public Key
  emailjs.init({
      publicKey: "8Xap3mchwCoGrwhEj"
  });

  // 2. Select the form and other HTML elements
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");
  const submitButton = document.getElementById("submit-btn");

  // 3. Listen for form submission
  contactForm.addEventListener("submit", function (event) {
      // Prevent the page from refreshing
      event.preventDefault();

      // Validate the form
      if (!contactForm.checkValidity()) {
          contactForm.reportValidity();
          return;
      }

      // Show a sending message
      formStatus.textContent = "Sending your message...";
      formStatus.className = "text-sm mb-4 font-medium text-zinc-400";

      // Disable the button while sending
      submitButton.disabled = true;

      // 4. Send the form information through EmailJS
      emailjs.sendForm(
          "service_9a97yxz",
          "template_4z3cdyb",
          contactForm
      )
      // 5. If the email is sent successfully
      .then(function (response) {
          console.log("SUCCESS!", response.status, response.text);
          formStatus.textContent = "Your message has been sent successfully!";
          formStatus.className = "text-sm mb-4 font-medium text-green-400";

          // Clear the form
          contactForm.reset();
      })
      // 6. If something goes wrong
      .catch(function (error) {
          console.error("EmailJS Error:", error);
          formStatus.textContent = "Sorry, your message could not be sent. Please try again.";
          formStatus.className = "text-sm mb-4 font-medium text-red-400";
      })
      // 7. Re-enable the button
      .finally(function () {
          submitButton.disabled = false;
      });
  });