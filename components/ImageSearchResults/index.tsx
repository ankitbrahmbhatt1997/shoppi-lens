import React from "react";

interface ImageSearchResultsProps {
  isSearching: boolean;
  similarImages: Array<{ path: string; similarity: number }>;
}

export const ImageSearchResults: React.FC<ImageSearchResultsProps> = ({
  isSearching,
  similarImages,
}) => {
  return (
    <div className="w-1/2 p-4 bg-white overflow-y-auto" style={{ maxHeight: 'calc(100vh - 120px)' }}>
      <div className="p-4 rounded-lg">
        <h2 className="text-xl mb-4 text-gray-800">Similar Images</h2>
        {isSearching ? (
          <div className="text-center py-8 text-gray-600">Searching...</div>
        ) : similarImages.length > 0 ? (
          <div className="columns-2 gap-4">
            {similarImages.map((img, index) => (
              <ImageCard key={index} image={img} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-600">
            Adjust crop area to search for similar images
          </div>
        )}
      </div>
    </div>
  );
};

interface ImageCardProps {
  image: { path: string; similarity: number };
}

const ImageCard: React.FC<ImageCardProps> = ({ image }) => (
  <div className="relative mb-4 group">
    <img
      src={image.path}
      alt="Similar image"
      className="rounded-lg w-full"
      loading="lazy"
    />
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity">
      <div className="text-white text-sm">
        Similarity: {(image.similarity * 100).toFixed(2)}%
      </div>
    </div>
  </div>
);
