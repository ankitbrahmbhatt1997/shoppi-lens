import React from "react";
import Cropper from "react-cropper";

interface ImageCropperProps {
  image: string;
  onCropEnd: (event: any) => void;
  onCropperInit: (cropper: any) => void;
}

export const ImageCropperComponent: React.FC<ImageCropperProps> = ({
  image,
  onCropEnd,
  onCropperInit,
}) => {
  return (
    <div className="w-1/2 p-4 bg-gray-900 min-h-[calc(100vh-120px)]">
      <div className="bg-gray-800 p-4 rounded-lg">
        <div className="text-[1.6rem] px-4 py-2 rounded-[2.6rem] border-2 border-gray-600 w-[20rem] text-center mx-auto mb-10">
          Find image source
        </div>
        <Cropper
          style={{ height: "70vh", width: "100%" }}
          zoomTo={0.5}
          initialAspectRatio={1}
          src={image}
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false}
          onInitialized={onCropperInit}
          cropend={onCropEnd}
          guides={true}
          className="bg-gray-700 rounded"
        />
      </div>
    </div>
  );
};
