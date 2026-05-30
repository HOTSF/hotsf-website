/**
 * Hands of Time Scholars Foundation — Zeffy Integration Config
 *
 * This file centralizes all Zeffy form URLs and configuration. When you create
 * forms in your Zeffy account, replace the PLACEHOLDER values below with the
 * real embed URLs Zeffy provides.
 *
 * Zeffy provides two URL patterns per form:
 *   1. Embed URL (for iframe inline embeds):
 *        https://www.zeffy.com/en-US/embed/donation-form/<form-id>
 *   2. Direct URL (for buttons/modals/social sharing):
 *        https://www.zeffy.com/en-US/donation-form/<form-id>
 *
 * Set ZEFFY.live = true once your forms are created and tested.
 *
 * To activate: Replace each "PLACEHOLDER" string below, then set live = true.
 */

window.ZEFFY = {
  // Set to true to activate live Zeffy embeds. While false, the site
  // continues to show the "Coming Soon" modal and pre-launch messaging.
  live: false,

  // ─── Individual Giving — One-Time Donation Form ──────────────────────────
  oneTime: {
    embedUrl: 'PLACEHOLDER_ZEFFY_ONETIME_EMBED_URL',
    directUrl: 'PLACEHOLDER_ZEFFY_ONETIME_DIRECT_URL',
    // Suggested URL params Zeffy supports: ?amount=100&frequency=once
  },

  // ─── Recurring / Monthly Giving Form ─────────────────────────────────────
  monthly: {
    embedUrl: 'PLACEHOLDER_ZEFFY_MONTHLY_EMBED_URL',
    directUrl: 'PLACEHOLDER_ZEFFY_MONTHLY_DIRECT_URL',
    // Suggested URL params: ?amount=50&frequency=monthly
  },

  // ─── Brand Partnership Memberships (six annual tiers) ────────────────────
  // Each tier is a Zeffy Membership form. Create one form per tier in Zeffy.
  partnership: {
    supporter:        { directUrl: 'PLACEHOLDER_ZEFFY_PARTNER_SUPPORTER_URL',        price: 1000  },
    patron:           { directUrl: 'PLACEHOLDER_ZEFFY_PARTNER_PATRON_URL',           price: 2500  },
    champion:         { directUrl: 'PLACEHOLDER_ZEFFY_PARTNER_CHAMPION_URL',         price: 5000  },
    presenting:       { directUrl: 'PLACEHOLDER_ZEFFY_PARTNER_PRESENTING_URL',       price: 10000 },
    visionary:        { directUrl: 'PLACEHOLDER_ZEFFY_PARTNER_VISIONARY_URL',        price: 25000 },
    legacy:           { directUrl: 'PLACEHOLDER_ZEFFY_PARTNER_LEGACY_URL',           price: 50000 },
  },

  // ─── Major Gifts — handled offline; "Discuss a Major Gift" button uses email
  majorGiftEmail: 'jeremy@hotsf.org', // Will be activated once Google Workspace is live

  // ─── Mailing address for check donations ─────────────────────────────────
  mailingAddress: {
    line1: 'Hands of Time Scholars Foundation Inc.',
    line2: '6907 University Ave #221',
    line3: 'Middleton, WI 53562',
  },

  // ─── Helper to build a tier-specific donation URL ────────────────────────
  buildAmountUrl(amount, frequency = 'once') {
    const base = frequency === 'monthly' ? this.monthly.directUrl : this.oneTime.directUrl;
    if (!base || base.startsWith('PLACEHOLDER')) return null;
    return `${base}?amount=${amount}&frequency=${frequency}`;
  },
};
