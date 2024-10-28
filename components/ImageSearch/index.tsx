import { useState } from 'react';
import Image from 'next/image';

export default function ImageSearch() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [similarImages, setSimilarImages] = useState<Array<{ path: string; similarity: number }>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!selectedImage) return;

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', selectedImage);

      const response = await fetch('/api/search-similar', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setSimilarImages(data.similarImages);
      } else {
        console.error('Error:', data.error);
      }
    } catch (error) {
      console.error('Error searching similar images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          className="mb-2"
        />
        {previewUrl && (
          <div className="mt-2">
            <h3 className="text-lg font-semibold mb-2">Selected Image:</h3>
            <Image
              src={previewUrl}
              alt="Preview"
              width={200}
              height={200}
              className="rounded-lg"
            />
          </div>
        )}
        <button
          onClick={handleSubmit}
          disabled={!selectedImage || isLoading}
          className={`mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg ${
            (!selectedImage || isLoading) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
          }`}
        >
          {isLoading ? 'Searching...' : 'Search Similar Images'}
        </button>
      </div>

      {similarImages.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Similar Images:</h3>
          <div className="grid grid-cols-3 gap-4">
            {similarImages.map((img, index) => (
              <div key={index} className="relative">
                <Image
                  src={img.path}
                  alt={`Similar image ${index + 1}`}
                  width={200}
                  height={200}
                  className="rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 rounded-b-lg">
                  Similarity: {(img.similarity * 100).toFixed(2)}%
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
