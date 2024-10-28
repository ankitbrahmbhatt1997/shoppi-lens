# Shoppi-lens - Visual Search for E-commerce

## Overview
Shoppi-lens is a cutting-edge visual search platform that helps users find similar products using image recognition. Built with Next.js and TypeScript, it provides an intuitive interface for visual product discovery, powered by advanced image processing and similarity search features.

## Features

### 1. Visual Search Interface
- Clean, modern design optimized for e-commerce
- Drag and drop image upload


### 2. Advanced Image Search
- Precise image cropping for focused search
- Real-time similarity search
- Visual similarity scoring
- Smart product recommendations
- Grid layout for search results

## Technical Architecture

### Frontend
- **Next.js & React**: For server-side rendering and component-based UI
- **TypeScript**: For type-safe code
- **TailwindCSS**: For styling and responsive design
- **React Cropper**: For image cropping functionality

### Backend
- **Supabase**: For database and storage
- **pgvector**: For vector similarity search
- **Vision Transformers**: For image embedding generation
- **Next.js API Routes**: For serverless API endpoints

## Core Components

### 1. Search Component
- Main search interface
- Handles voice input and image search triggers
- Manages search suggestions

### 2. GoogleLensUpload Component
- Handles image uploads via file or URL
- Provides drag-and-drop functionality
- Manages image preview
- Routes to cropping interface

### 3. ImageCropper Component
- Provides image cropping functionality
- Generates cropped image data
- Initiates similarity search

### 4. ImageSearchResults Component
- Displays search results in a grid layout
- Shows similarity scores
- Handles lazy loading of images

## Technical Approach

### Image Search Pipeline
1. **Image Input**: User uploads image or provides URL
2. **Preprocessing**: Image is cropped/adjusted as needed
3. **Feature Extraction**: Vision transformer model generates image embeddings
4. **Similarity Search**: pgvector performs vector similarity search
5. **Result Display**: Similar images are displayed with similarity scores

### Database Structure
- Uses Supabase with pgvector extension
- Stores image paths and their corresponding embeddings
- Enables efficient similarity searches using vector operations

### Performance Optimizations
- Lazy loading of images
- Efficient vector similarity search
- Client-side caching
- Optimized image processing

## Setup and Installation

1. Clone the repository
2. Install dependencies:

## Future Improvements
- Enhanced mobile responsiveness
- Additional image processing options
- Batch image search capability
- Advanced filtering options
- Performance optimizations for large datasets
- Integration with more image sources


## Technical Deep Dive: CLIP AI & Vector Database

### CLIP (Contrastive Language-Image Pre-training)
Our solution leverages OpenAI's CLIP model for image understanding and similarity search. Here's how it works:

1. **Image Embedding Generation**
   - CLIP uses a Vision Transformer (ViT) architecture to process images
   - The model converts each image into a 512-dimensional vector (embedding)
   - These embeddings capture high-level visual features and semantic meaning
   - We use the @xenova/transformers implementation for client-side processing

2. **Vector Database (pgvector)**
   - PostgreSQL with pgvector extension for vector similarity operations
   - Each image's embedding is stored as a vector alongside its URL
   - Enables efficient similarity searches using cosine similarity
   - Vectors are indexed for fast retrieval

3. **Similarity Search Process**   ```
   Input Image → CLIP Embedding → Vector Similarity Search → Similar Images   ```

   a. **Input Processing**
      - User uploads or crops an image
      - Image is converted to base64/blob format
      - CLIP model generates embedding vector

   b. **Vector Comparison**
      - Uses cosine similarity metric
      - Measures angle between vectors in high-dimensional space
      - Similarity score ranges from 0 to 1 (1 being identical)
      - Query: `1 - (embedding <=> query_embedding) as similarity`

   c. **Threshold-based Matching**
      - Primary search uses 0.3 similarity threshold
      - Fallback search with 0.1 threshold for diverse results
      - Returns top 10 most similar images by default

### Performance Considerations
- Vector operations are computationally intensive
- pgvector uses HNSW indexing for efficient searches
- Batch processing for dataset loading
- Caching of frequently accessed embeddings
- Progressive loading of search results

### Advantages of this Approach
1. **Content Understanding**
   - CLIP understands semantic content, not just visual features
   - Works well across different image styles and contexts
   - No need for manual tagging or categorization

2. **Scalability**
   - Vector operations are highly parallelizable
   - Efficient indexing for large datasets
   - Supabase handles infrastructure complexity

3. **Flexibility**
   - Can easily extend to support text-to-image search
   - Adaptable similarity thresholds
   - Support for different vector dimensions

This combination of CLIP AI and vector database technology enables powerful, content-aware image similarity search with excellent performance characteristics.

## Using Your Own Dataset

### Dataset Setup
1. Create a `data-set` folder in the project root:
   ```
   your-project/
   ├── data-set/
   │   ├── image1.jpg
   │   ├── image2.png
   │   ├── image3.webp
   │   └── ...
   ```

2. Supported image formats:
   - JPEG/JPG
   - PNG
   - WebP
   - GIF (first frame only)

### Loading Your Dataset
1. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

2. Load your dataset by making a GET request to:
   ```
   http://localhost:3000/api/load-data-set
   ```
   This will:
   - Process all images in your data-set folder
   - Generate CLIP embeddings for each image
   - Store the embeddings in the vector database
   - Show progress in the console

### Important Notes
- Ensure images are of reasonable quality and size
- Processing time depends on dataset size and image dimensions
- The server must remain running during the entire loading process
- Duplicate images will be skipped automatically
- Maximum recommended batch size: 1000 images

### Monitoring Progress
- Check the console for processing status
- Each successful upload will be logged
- Any errors will be displayed with the specific image name
- Final summary will show total images processed

### Troubleshooting
- If loading fails, check image formats and sizes
- Ensure sufficient memory for large datasets
- Verify database connection settings
- Check console for specific error messages



## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

