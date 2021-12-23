function useBrandColor(brandColor: string, lightBrand: boolean) {
  if (lightBrand) {
    return '#000';
  }
  return brandColor;
}

export default useBrandColor;
