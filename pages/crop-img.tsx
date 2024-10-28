import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { ImageSearchResults } from "@/components/ImageSearchResults";
import { ImageCropperComponent } from "@/components/ImageCropper";
import { searchSimilarImages } from "@/utils/imageSearch";

interface SimilarImage {
  path: string;
  similarity: number;
}

export const ImageCropper: React.FC = () => {
  const router = useRouter();
  const [image, setImage] = useState<string>("");
  const [cropper, setCropper] = useState<any>();
  const [similarImages, setSimilarImages] = useState<SimilarImage[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    initializeImageFromQuery();
  }, [router.query]);

  const initializeImageFromQuery = async () => {
    const { image: queryImage } = router.query;
    if (queryImage && typeof queryImage === "string") {
      setImage(queryImage);
      await handleImageSearch(queryImage);
    }
  };

  const handleImageSearch = async (imageData: string) => {
    setIsSearching(true);
    try {
      const results = await searchSimilarImages(imageData);
      setSimilarImages(results);
    } catch (error) {
      console.error("Error searching similar images:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleCropEnd = (event: any) => {
    if (event?.target?.cropper) {
      const croppedDataUrl = event.target.cropper.getCroppedCanvas().toDataURL();
      handleImageSearch(croppedDataUrl);
    }
  };

  if (!image) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <div className="bg-white min-h-screen text-white overflow-hidden">
      <header className="mb-8 m-8">
        <img
          src="/images/google.svg"
          alt="google Logo"
          width={80}
        />
      </header>

      <div className="flex">
        <ImageCropperComponent
          image={image}
          onCropEnd={handleCropEnd}
          onCropperInit={setCropper}
        />
        
        <ImageSearchResults
          isSearching={isSearching}
          similarImages={similarImages}
        />
      </div>
    </div>
  );
};

export default ImageCropper;
