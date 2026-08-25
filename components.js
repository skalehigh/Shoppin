const siteHeader = `
  <a class="skip-link" href="#main">Skip to content</a>
  <div class="grain" aria-hidden="true"></div>
  <header class="site-header" data-header>
    <a class="brand" href="index.html">
      <span class="brand-mark" aria-hidden="true">S</span>
      <span class="brand-name">Shoppin</span>
    </a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-nav">
      <span></span><span></span><span class="sr-only">Toggle menu</span>
    </button>
    <nav class="primary-nav" id="primary-nav" aria-label="Primary navigation">
      <details class="nav-dropdown">
        <summary>Services</summary>
        <div class="nav-dropdown-menu">
          <a href="personal-shopper.html">Personal Shopper</a>
          <a href="personal-assistant.html">Personal Assistant</a>
          <a href="sourcing-export.html">Sourcing & Export</a>
          <a href="corporate-services.html">Corporate Services</a>
        </div>
      </details>
      <a href="pricing.html">Pricing</a>
      <a href="faqs.html">FAQs</a>
      <a href="about.html">About</a>
      <a href="contact.html">Contact</a>
    </nav>
    <a class="button button-dark header-cta" href="https://wa.me/918885629392?text=Hi%20Shoppin%2C%20I%27d%20like%20help%20with%20a%20request." target="_blank" rel="noopener" data-whatsapp="header">
      Start on WhatsApp <span aria-hidden="true">↗</span>
    </a>
  </header>`;

const siteFooter = `
  <footer class="site-footer">
    <div class="footer-main">
      <div>
        <a class="brand footer-brand" href="index.html">
          <span class="brand-mark">S</span><span class="brand-name">Shoppin</span>
        </a>
        <p>Your trusted shopper and assistant, wherever the request leads.</p>
        <div class="footer-socials">
          <a href="https://www.instagram.com/shoppin_in/" target="_blank" rel="noopener" aria-label="Follow Shoppin on Instagram" title="Instagram"><svg class="social-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"></circle></svg></a>
          <a href="https://www.facebook.com/ShoppinShopper" target="_blank" rel="noopener" aria-label="Follow Shoppin on Facebook" title="Facebook"><svg class="social-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M14.5 8H17V4.5h-2.8C11.3 4.5 10 6.2 10 8.8V11H7v3.5h3V21h4v-6.5h3l.5-3.5H14V9c0-.7.2-1 1-1Z"></path></svg></a>
          <a href="https://www.youtube.com/channel/UC35vNhYFWrMaYUkJ3epnKMQ" target="_blank" rel="noopener" aria-label="Follow Shoppin on YouTube" title="YouTube"><svg class="social-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12c0 2.2-.3 4.2-.8 5.2-.3.6-.8 1-1.4 1.2-1.3.4-5.1.4-6.8.4s-5.5 0-6.8-.4a2.4 2.4 0 0 1-1.4-1.2C3.3 16.2 3 14.2 3 12s.3-4.2.8-5.2c.3-.6.8-1 1.4-1.2 1.3-.4 5.1-.4 6.8-.4s5.5 0 6.8.4c.6.2 1.1.6 1.4 1.2.5 1 .8 3 .8 5.2Z"></path><path d="m10 9 5 3-5 3Z"></path></svg></a>
          <a href="https://www.linkedin.com/company/shoppin-your-personal-shopper" target="_blank" rel="noopener" aria-label="Follow Shoppin on LinkedIn" title="LinkedIn"><svg class="social-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="9" width="3.5" height="11"></rect><circle cx="5.75" cy="5.5" r="1.75" fill="currentColor" stroke="none"></circle><path d="M11 20V9h3.5v1.7c.9-1.3 2-2 3.6-2 2.7 0 3.9 1.8 3.9 4.8V20h-3.5v-5.8c0-1.5-.5-2.4-1.8-2.4-1.4 0-2.2 1-2.2 2.9V20Z"></path></svg></a>
          <a href="https://in.pinterest.com/shoppin_in/" target="_blank" rel="noopener" aria-label="Follow Shoppin on Pinterest" title="Pinterest"><svg class="social-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9.3 20.5c.8-2.3 1.1-3.5 1.5-5.3-.7-1.2-.1-3.7.7-5.2.7-1.3 2.8-1 2.8.8 0 1.1-.7 2.7-1.1 4.2-.4 1.3.7 2.4 2 2.4 2.4 0 4-3 4-6.5 0-2.7-2.2-5.2-6.2-5.2-4.5 0-7.1 3.3-7.1 6.8 0 1.2.4 2.5 1.2 3.2"></path><path d="M7.1 15.7c-.4-.2-1.4-.6-1.7-2.3"></path></svg></a>
          <a href="https://g.page/r/CV8iADAX5pvIEAI/review" target="_blank" rel="noopener" aria-label="Read or leave a Google review for Shoppin" title="Google Reviews"><svg class="social-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 11.5a8.5 8.5 0 1 1-2.3-5.8"></path><path d="M20.5 5.5v6h-6"></path><path d="m12 8.2 1.1 2.3 2.5.3-1.8 1.8.4 2.5-2.2-1.2-2.2 1.2.4-2.5-1.8-1.8 2.5-.3Z"></path></svg></a>
        </div>
      </div>
      <div class="footer-column">
        <h3>Services</h3>
        <a href="personal-shopper.html">Personal Shopper</a>
        <a href="personal-assistant.html">Personal Assistant</a>
        <a href="sourcing-export.html">Sourcing & Export</a>
        <a href="corporate-services.html">Corporate Services</a>
      </div>
      <div class="footer-column">
        <h3>Explore</h3>
        <a href="pricing.html">Pricing</a>
        <a href="faqs.html">FAQs</a>
        <a href="about.html">About Us</a>
        <a href="contact.html">Contact Us</a>
        <a href="careers.html">Careers</a>
      </div>
      <div class="footer-column">
        <h3>Policies</h3>
        <a href="privacy.html">Privacy</a>
        <a href="terms.html">Terms</a>
        <a href="shipping.html">Shipping</a>
        <a href="returns.html">Returns</a>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© <span data-year></span> Thinkorporation Tech Pvt Ltd</span>
      <div><a href="mailto:mailtoshoppin@gmail.com">mailtoshoppin@gmail.com</a><a href="tel:+918885629392">+91 88856 29392</a></div>
    </div>
  </footer>
  <a class="mobile-whatsapp" href="https://wa.me/918885629392?text=Hi%20Shoppin%2C%20I%27d%20like%20help%20with%20a%20request.%20" target="_blank" rel="noopener" data-whatsapp="mobile-sticky">
    Start on WhatsApp <span>↗</span>
  </a>`;

const whatsappLeadDialogMarkup = `
  <div class="whatsapp-dialog" data-whatsapp-dialog hidden>
    <button class="whatsapp-dialog-backdrop" type="button" data-whatsapp-close aria-label="Close contact form"></button>
    <section class="whatsapp-dialog-panel" role="dialog" aria-modal="true" aria-labelledby="whatsapp-dialog-title">
      <button class="whatsapp-dialog-close" type="button" data-whatsapp-close aria-label="Close contact form">×</button>
      <p class="eyebrow">Before we continue</p>
      <h2 id="whatsapp-dialog-title">Tell us how to reach you.</h2>
      <p>Share a few contact details so we can identify your request. You will continue directly to WhatsApp.</p>
      <form class="whatsapp-lead-form" data-whatsapp-form>
        <label>
          <span>Name</span>
          <input type="text" name="name" autocomplete="name" maxlength="80" required>
        </label>
        <label>
          <span>Email <small>Optional</small></span>
          <input type="email" name="email" autocomplete="email" maxlength="120">
        </label>
        <div class="whatsapp-phone-fields">
          <label>
            <span>Country code</span>
            <select name="countryCode" autocomplete="tel-country-code" required>
              <option value="+91">India (+91)</option>
              <option value="+1">US / Canada (+1)</option>
              <option value="+44">United Kingdom (+44)</option>
              <option value="+971">UAE (+971)</option>
              <option value="+61">Australia (+61)</option>
              <option value="+65">Singapore (+65)</option>
              <option value="+966">Saudi Arabia (+966)</option>
              <option value="+974">Qatar (+974)</option>
              <option value="+968">Oman (+968)</option>
              <option value="+965">Kuwait (+965)</option>
              <option value="+64">New Zealand (+64)</option>
              <option value="+49">Germany (+49)</option>
              <option value="+33">France (+33)</option>
              <option value="+31">Netherlands (+31)</option>
              <option value="+27">South Africa (+27)</option>
              <option value="other">Other</option>
            </select>
          </label>
          <label>
            <span>Phone number</span>
            <input type="tel" name="phone" autocomplete="tel-national" inputmode="tel" maxlength="24" placeholder="88856 29392" required>
          </label>
        </div>
        <p class="whatsapp-form-note">For “Other”, enter the complete number beginning with + and the country code. These details are added to your WhatsApp message and are not stored by this website.</p>
        <button class="button button-whatsapp button-large" type="submit">
          Continue to WhatsApp <span aria-hidden="true">↗</span>
        </button>
      </form>
    </section>
  </div>`;

document.querySelector("[data-site-header]")?.replaceWith(
  document.createRange().createContextualFragment(siteHeader)
);
document.querySelector("[data-site-footer]")?.replaceWith(
  document.createRange().createContextualFragment(siteFooter)
);
if (!document.querySelector("[data-whatsapp-dialog]")) {
  document.body.insertAdjacentHTML("beforeend", whatsappLeadDialogMarkup);
}
