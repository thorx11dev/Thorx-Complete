/**
 * Sophisticated Email Validation System
 * Implements multiple validation layers to ensure genuine email addresses
 */

interface EmailValidationResult {
  isValid: boolean;
  score: number; // 0-100 confidence score
  errors: string[];
  warnings: string[];
  suggestions?: string;
}

interface EmailParts {
  local: string;
  domain: string;
  tld: string;
}

export class EmailValidator {
  // Common disposable email domains
  private static readonly DISPOSABLE_DOMAINS = new Set([
    '10minutemail.com', 'tempmail.org', 'guerrillamail.com', 'mailinator.com',
    'throwawaymailaddress.com', 'temp-mail.org', 'dispostable.com', 'yopmail.com',
    'maildrop.cc', 'trashmail.com', 'getnada.com', 'sharklasers.com',
    'guerrillamail.org', 'guerrillamail.net', 'guerrillamail.biz', 'guerrillamail.de',
    'grr.la', 'guerrillamailblock.com', 'pokemail.net', 'spam4.me'
  ]);

  // Trusted email providers
  private static readonly TRUSTED_PROVIDERS = new Set([
    'gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'aol.com',
    'icloud.com', 'protonmail.com', 'live.com', 'msn.com', 'yandex.com',
    'mail.com', 'zoho.com', 'fastmail.com', 'hey.com', 'tutanota.com'
  ]);

  // Valid TLDs (top-level domains)
  private static readonly VALID_TLDS = new Set([
    'com', 'org', 'net', 'edu', 'gov', 'mil', 'int', 'co', 'io', 'me',
    'info', 'biz', 'name', 'tv', 'cc', 'us', 'uk', 'ca', 'au', 'de',
    'fr', 'jp', 'in', 'br', 'ru', 'cn', 'live', 'app', 'dev', 'tech'
  ]);

  // Common typos in popular domains
  private static readonly DOMAIN_TYPOS = new Map([
    ['gmial.com', 'gmail.com'],
    ['gmai.com', 'gmail.com'],
    ['gmil.com', 'gmail.com'],
    ['yahooo.com', 'yahoo.com'],
    ['yaho.com', 'yahoo.com'],
    ['outlok.com', 'outlook.com'],
    ['outllok.com', 'outlook.com'],
    ['hotmial.com', 'hotmail.com'],
    ['hotmil.com', 'hotmail.com'],
    ['hotmal.com', 'hotmail.com']
  ]);

  /**
   * Comprehensive email validation with multiple checks
   */
  static validate(email: string): EmailValidationResult {
    const result: EmailValidationResult = {
      isValid: false,
      score: 0,
      errors: [],
      warnings: []
    };

    // Basic sanitization
    email = email.trim().toLowerCase();

    // Level 1: Basic format validation
    if (!this.basicFormatValidation(email, result)) {
      return result;
    }

    // Level 2: Parse email parts
    const emailParts = this.parseEmailParts(email);
    if (!emailParts) {
      result.errors.push('Invalid email format');
      return result;
    }

    // Level 3: Local part validation
    this.validateLocalPart(emailParts.local, result);

    // Level 4: Domain validation
    this.validateDomain(emailParts.domain, emailParts.tld, result);

    // Level 5: Security checks
    this.performSecurityChecks(emailParts, result);

    // Level 6: Quality scoring
    this.calculateQualityScore(emailParts, result);

    // Level 7: Suggestions for common mistakes
    this.generateSuggestions(emailParts, result);

    // Final validation decision
    result.isValid = result.errors.length === 0 && result.score >= 60;

    return result;
  }

  /**
   * Level 1: Basic format validation using RFC 5322 compliant regex
   */
  private static basicFormatValidation(email: string, result: EmailValidationResult): boolean {
    // Check for basic requirements
    if (!email) {
      result.errors.push('Email address is required');
      return false;
    }

    if (email.length > 320) {
      result.errors.push('Email address is too long (max 320 characters)');
      return false;
    }

    if (email.length < 5) {
      result.errors.push('Email address is too short');
      return false;
    }

    // RFC 5322 compliant regex (simplified but robust)
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    
    if (!emailRegex.test(email)) {
      result.errors.push('Invalid email format');
      return false;
    }

    result.score += 20; // Base score for valid format
    return true;
  }

  /**
   * Parse email into components
   */
  private static parseEmailParts(email: string): EmailParts | null {
    const atIndex = email.lastIndexOf('@');
    if (atIndex === -1) return null;

    const local = email.substring(0, atIndex);
    const domain = email.substring(atIndex + 1);
    const dotIndex = domain.lastIndexOf('.');
    
    if (dotIndex === -1) return null;

    const tld = domain.substring(dotIndex + 1);
    const domainName = domain.substring(0, dotIndex);

    return { local, domain, tld };
  }

  /**
   * Level 3: Local part validation
   */
  private static validateLocalPart(local: string, result: EmailValidationResult): void {
    if (local.length === 0) {
      result.errors.push('Local part cannot be empty');
      return;
    }

    if (local.length > 64) {
      result.errors.push('Local part is too long (max 64 characters)');
      return;
    }

    // Check for consecutive dots
    if (local.includes('..')) {
      result.errors.push('Email cannot contain consecutive dots');
      return;
    }

    // Check for leading/trailing dots
    if (local.startsWith('.') || local.endsWith('.')) {
      result.errors.push('Email cannot start or end with a dot');
      return;
    }

    // Check for suspicious patterns
    if (local.includes('+++') || local.includes('---')) {
      result.warnings.push('Unusual character patterns detected');
    }

    // Check for numbers-only local part (often spam)
    if (/^\d+$/.test(local)) {
      result.warnings.push('Numbers-only usernames are often associated with spam');
      result.score -= 10;
    }

    // Bonus for normal-looking local part
    if (/^[a-zA-Z][a-zA-Z0-9._-]*[a-zA-Z0-9]$/.test(local)) {
      result.score += 10;
    }
  }

  /**
   * Level 4: Domain validation
   */
  private static validateDomain(domain: string, tld: string, result: EmailValidationResult): void {
    if (domain.length === 0) {
      result.errors.push('Domain cannot be empty');
      return;
    }

    if (domain.length > 253) {
      result.errors.push('Domain is too long (max 253 characters)');
      return;
    }

    // TLD validation
    if (tld.length < 2 || tld.length > 63) {
      result.errors.push('Invalid top-level domain');
      return;
    }

    if (!this.VALID_TLDS.has(tld)) {
      result.warnings.push(`Uncommon or invalid TLD: ${tld}`);
      result.score -= 5;
    }

    // Check for valid characters in domain
    if (!/^[a-zA-Z0-9.-]+$/.test(domain)) {
      result.errors.push('Domain contains invalid characters');
      return;
    }

    // Check for consecutive hyphens
    if (domain.includes('--')) {
      result.warnings.push('Domain contains consecutive hyphens');
    }

    // Check for leading/trailing hyphens
    if (domain.startsWith('-') || domain.endsWith('-')) {
      result.errors.push('Domain cannot start or end with a hyphen');
      return;
    }

    result.score += 15; // Base score for valid domain
  }

  /**
   * Level 5: Security checks
   */
  private static performSecurityChecks(emailParts: EmailParts, result: EmailValidationResult): void {
    // Check for disposable email providers
    if (this.DISPOSABLE_DOMAINS.has(emailParts.domain)) {
      result.errors.push('Disposable email addresses are not allowed');
      return;
    }

    // Check for trusted providers (bonus points)
    if (this.TRUSTED_PROVIDERS.has(emailParts.domain)) {
      result.score += 20;
    }

    // Check for suspicious patterns
    if (emailParts.local.includes('test') || emailParts.local.includes('fake')) {
      result.warnings.push('Email appears to be a test or fake address');
      result.score -= 15;
    }

    // Check for role-based emails (often not personal)
    const roleNames = ['admin', 'support', 'info', 'noreply', 'sales', 'marketing'];
    if (roleNames.some(role => emailParts.local.toLowerCase().includes(role))) {
      result.warnings.push('Role-based email addresses may not be suitable for personal accounts');
      result.score -= 5;
    }
  }

  /**
   * Level 6: Quality scoring
   */
  private static calculateQualityScore(emailParts: EmailParts, result: EmailValidationResult): void {
    // Length scoring
    if (emailParts.local.length >= 3 && emailParts.local.length <= 20) {
      result.score += 10;
    }

    // Character diversity
    const hasLetter = /[a-zA-Z]/.test(emailParts.local);
    const hasNumber = /\d/.test(emailParts.local);
    const hasSpecial = /[._-]/.test(emailParts.local);

    if (hasLetter && hasNumber) result.score += 5;
    if (hasLetter && hasSpecial) result.score += 5;

    // Domain reputation
    const domainParts = emailParts.domain.split('.');
    if (domainParts.length >= 2 && domainParts.length <= 3) {
      result.score += 5;
    }

    // Ensure score is within bounds
    result.score = Math.max(0, Math.min(100, result.score));
  }

  /**
   * Level 7: Generate suggestions for common mistakes
   */
  private static generateSuggestions(emailParts: EmailParts, result: EmailValidationResult): void {
    // Check for common domain typos
    if (this.DOMAIN_TYPOS.has(emailParts.domain)) {
      result.suggestions = `Did you mean ${emailParts.local}@${this.DOMAIN_TYPOS.get(emailParts.domain)}?`;
    }

    // Check for missing common TLDs
    if (!emailParts.tld && emailParts.domain.includes('.')) {
      result.suggestions = `Did you mean ${emailParts.local}@${emailParts.domain}.com?`;
    }
  }

  /**
   * Quick validation for real-time feedback
   */
  static quickValidate(email: string): boolean {
    if (!email) return false;
    
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    
    if (!emailRegex.test(email.trim().toLowerCase())) {
      return false;
    }

    // Quick disposable check
    const domain = email.split('@')[1]?.toLowerCase();
    return domain && !this.DISPOSABLE_DOMAINS.has(domain);
  }

  /**
   * Get validation message based on result
   */
  static getValidationMessage(result: EmailValidationResult): string {
    if (result.errors.length > 0) {
      return result.errors[0];
    }
    
    if (result.warnings.length > 0 && result.score < 70) {
      return result.warnings[0];
    }

    if (result.suggestions) {
      return result.suggestions;
    }

    if (result.score < 60) {
      return 'Please enter a valid email address';
    }

    return '';
  }
}