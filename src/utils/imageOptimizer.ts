/**
 * Optimizes image URLs (especially Unsplash or CDN resources)
 * to deliver crisp, retina-ready fidelity at significantly smaller payload sizes,
 * eliminating page load stalls and network lag during scroll.
 */
export function getOptimizedImageUrl(url?: string | null, targetWidth: number = 420): string {
  if (!url) return '';
  
  // If it is a local bundle asset (data: or imported hash file), return directly
  if (url.startsWith('data:') || url.startsWith('/@') || url.startsWith('/src/assets') || url.startsWith('blob:')) {
    return url;
  }

  // Optimize Unsplash images: deliver responsive size + optimal compression (q=75 webp/auto)
  if (url.includes('images.unsplash.com')) {
    try {
      const parsedUrl = new URL(url);
      parsedUrl.searchParams.set('auto', 'format');
      parsedUrl.searchParams.set('fit', 'crop');
      parsedUrl.searchParams.set('w', targetWidth.toString());
      parsedUrl.searchParams.set('q', '75');
      return parsedUrl.toString();
    } catch {
      // Fallback regex replacement
      return url
        .replace(/w=\d+/, `w=${targetWidth}`)
        .replace(/q=\d+/, 'q=75');
    }
  }

  return url;
}
