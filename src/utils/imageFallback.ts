import React from 'react';
export { BEE_SVG_PLACEHOLDER, BEE_ENTRY_SVG_PLACEHOLDER, BEE_GUIDE_SVG_PLACEHOLDER, useImageFallback } from '../hooks/useImageFallback';
import { BEE_SVG_PLACEHOLDER, BEE_ENTRY_SVG_PLACEHOLDER } from '../hooks/useImageFallback';

export const DEFAULT_FLORA_FALLBACK_IMG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300' fill='none'%3E%3Crect width='400' height='300' fill='%23F5F5F4'/%3E%3Ccircle cx='200' cy='130' r='50' fill='%23FEF3C7' stroke='%23F59E0B' stroke-width='4'/%3E%3Cpath d='M200 180V250' stroke='%2310B981' stroke-width='8' stroke-linecap='round'/%3E%3Cpath d='M200 210C170 200 150 220 150 220C150 220 170 240 200 225' fill='%2334D399'/%3E%3Cpath d='M200 220C230 210 250 230 250 230C250 230 230 250 200 235' fill='%2334D399'/%3E%3Ctext x='200' y='275' text-anchor='middle' fill='%2378716C' font-family='sans-serif' font-size='13' font-weight='bold'%3EPlanta Meliponófila Raízer%3C/text%3E%3C/svg%3E";

export function handleImageError(e: React.SyntheticEvent<HTMLImageElement, Event>, fallbackUrl: string = DEFAULT_FLORA_FALLBACK_IMG) {
  const target = e.currentTarget;
  if (target.src !== fallbackUrl) {
    target.src = fallbackUrl;
  }
}

export function handleBeeImageError(e: React.SyntheticEvent<HTMLImageElement, Event>, type: 'worker' | 'entry' = 'worker') {
  const target = e.currentTarget;
  const fallback = type === 'entry' ? BEE_ENTRY_SVG_PLACEHOLDER : BEE_SVG_PLACEHOLDER;
  if (target.src !== fallback) {
    target.src = fallback;
  }
}

