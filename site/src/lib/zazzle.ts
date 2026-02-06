/**
 * Zazzle API Utilities
 * Handles RealView image generation and Linkover URL creation
 * Reference: _API_SPEC.json and ZazzleApiGuide.v3.pdf
 */

import projectConfig from '../../project_config.json';

// Extract configuration
const { 
  zazzle_credentials, 
  template_inventory, 
  domain_settings, 
  api_settings 
} = projectConfig;

const { associate_id_rf, member_id_at, store_id_sr, category_id_cg } = zazzle_credentials;

export interface Location {
  name: string;
  type: string;
  slug: string;
}

export interface Template {
  type: string;
  product_id_pd: string;
  parameter_mapping: {
    text_variable: string;
    image_variable: string;
  };
  constraints?: {
    max_text_length?: number;
    image_aspect_ratio?: string;
  };
  realview_params?: {
    max_dim: number;
    text_color: string;
  };
}

/**
 * URL encode a string for Zazzle API
 * All dynamic values must be URL encoded per Zazzle API spec
 */
export function encodeZazzleParam(value: string): string {
  return encodeURIComponent(value);
}

/**
 * Generate RealView image URL for product preview
 * Uses t_{name}_url format for images (NOT t_{name}_iid)
 * max_dim: 600 (values >699 include Zazzle branding)
 */
export function generateRealViewUrl(
  template: Template,
  location: Location,
  customTextColor?: string
): string {
  const baseUrl = api_settings.realview_base_url;
  const maxDim = template.realview_params?.max_dim || 600;
  const textColor = customTextColor || template.realview_params?.text_color || '000000';
  
  const params = new URLSearchParams();
  params.set('pid', template.product_id_pd);
  params.set('max_dim', maxDim.toString());
  params.set('at', member_id_at);
  
  // Set text parameter
  params.set(template.parameter_mapping.text_variable, location.name);
  
  // Set text color if applicable
  if (template.parameter_mapping.text_variable.includes('text')) {
    const colorParam = template.parameter_mapping.text_variable.replace('_txt', '_txtclr');
    params.set(colorParam, textColor);
  }
  
  return `${baseUrl}?${params.toString()}`;
}

/**
 * Generate RealView URL with custom text (for preview variations)
 */
export function generateRealViewUrlWithText(
  template: Template,
  text: string,
  customTextColor?: string
): string {
  const baseUrl = api_settings.realview_base_url;
  const maxDim = template.realview_params?.max_dim || 600;
  const textColor = customTextColor || template.realview_params?.text_color || '000000';
  
  const params = new URLSearchParams();
  params.set('pid', template.product_id_pd);
  params.set('max_dim', maxDim.toString());
  params.set('at', member_id_at);
  
  // Set text parameter
  params.set(template.parameter_mapping.text_variable, text);
  
  // Set text color if applicable
  if (template.parameter_mapping.text_variable.includes('text')) {
    const colorParam = template.parameter_mapping.text_variable.replace('_txt', '_txtclr');
    params.set(colorParam, textColor);
  }
  
  return `${baseUrl}?${params.toString()}`;
}

/**
 * Generate Linkover URL for "Customize on Zazzle" button
 * Uses 1-to-Many (Templates Buffet) mode with ax=DesignBlast
 * Uses t_{name}_iid format for images (NOT t_{name}_url)
 */
export function generateLinkoverUrl(
  location: Location,
  returnUrl?: string
): string {
  const baseUrl = `${api_settings.linkover_base_url}/at-${member_id_at}`;
  
  const params = new URLSearchParams();
  
  // Required common parameters
  params.set('at', member_id_at);
  params.set('ax', 'DesignBlast'); // 1-to-Many mode
  
  // Required for 1-to-Many
  params.set('sr', store_id_sr);
  params.set('cg', category_id_cg);
  
  // Affiliate tracking
  params.set('rf', associate_id_rf);
  
  // Template object parameters - use first template's mapping
  // In 1-to-Many mode, all templates should use consistent parameter names
  const primaryTemplate = template_inventory[0];
  params.set(primaryTemplate.parameter_mapping.text_variable, location.name);
  
  // Allow user customization
  params.set('ed', 'true');
  
  // Boomerang strategy - return URL
  if (returnUrl) {
    params.set('continueUrl', returnUrl);
  }
  
  return `${baseUrl}?${params.toString()}`;
}

/**
 * Generate specific product Linkover URL (1-to-1 mode)
 * Use this for direct linking to a specific product template
 */
export function generateProductLinkoverUrl(
  template: Template,
  location: Location,
  returnUrl?: string
): string {
  const baseUrl = `${api_settings.linkover_base_url}/at-${member_id_at}`;
  
  const params = new URLSearchParams();
  
  // Required common parameters
  params.set('at', member_id_at);
  params.set('ax', 'Linkover'); // 1-to-1 mode
  
  // Required for 1-to-1
  params.set('pd', template.product_id_pd);
  
  // Affiliate tracking
  params.set('rf', associate_id_rf);
  
  // Template object parameters
  params.set(template.parameter_mapping.text_variable, location.name);
  
  // Allow user customization
  params.set('ed', 'true');
  
  // Return URL
  if (returnUrl) {
    params.set('continueUrl', returnUrl);
  }
  
  return `${baseUrl}?${params.toString()}`;
}

/**
 * Generate SEO-friendly meta description for a location
 */
export function generateMetaDescription(location: Location): string {
  return `Shop custom ${location.name} merchandise including mugs, sweatshirts, and hats. Personalizable gifts and apparel featuring ${location.name} - perfect for camping enthusiasts and nature lovers.`;
}

/**
 * Generate SEO-friendly title for a location
 */
export function generatePageTitle(location: Location): string {
  return `${location.name} Merchandise & Gifts | Linefulness`;
}

/**
 * Generate Open Graph image URL for social sharing
 */
export function generateOgImageUrl(location: Location): string {
  // Use the first template for OG image
  const template = template_inventory[0];
  return generateRealViewUrl(template, location);
}

/**
 * Get all available templates
 */
export function getTemplates(): Template[] {
  return template_inventory;
}

/**
 * Get template by type (e.g., 'Mug', 'Sweatshirt', 'Hat')
 */
export function getTemplateByType(type: string): Template | undefined {
  return template_inventory.find(t => t.type.toLowerCase() === type.toLowerCase());
}

/**
 * Validate location name length against template constraints
 */
export function validateLocationName(location: Location): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  for (const template of template_inventory) {
    const maxLength = template.constraints?.max_text_length;
    if (maxLength && location.name.length > maxLength) {
      errors.push(`${template.type}: Name exceeds ${maxLength} characters`);
    }
  }
  
  return { valid: errors.length === 0, errors };
}

/**
 * Get domain settings
 */
export function getDomainSettings() {
  return domain_settings;
}

/**
 * Check if a URL is from a declared image host
 */
export function isDeclaredImageHost(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return domain_settings.allowed_domains.includes(urlObj.hostname);
  } catch {
    return false;
  }
}
