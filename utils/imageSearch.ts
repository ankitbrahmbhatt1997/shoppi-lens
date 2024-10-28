export async function searchSimilarImages(imageData: string) {
  const response = await fetch(imageData);
  const blob = await response.blob();
  const file = new File([blob], "cropped-image.jpg", {
    type: "image/jpeg",
  });

  const formData = new FormData();
  formData.append("image", file);

  const searchResponse = await fetch("/api/search-similar", {
    method: "POST",
    body: formData,
  });

  const data = await searchResponse.json();
  if (!data.success) {
    throw new Error(data.error || 'Search failed');
  }

  return data.similarImages;
}
