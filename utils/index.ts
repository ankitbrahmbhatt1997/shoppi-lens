import fs from 'fs';
import path from 'path';

/**
 * Gets all file paths from a directory
 * @param directory The directory path to scan
 * @returns Array of full file paths
 */
export function getFilePaths(directory: string): string[] {
  try {
    // Check if directory exists
    if (!fs.existsSync(directory)) {
      console.error(`Directory does not exist: ${directory}`);
      return [];
    }

    // Read directory contents
    const files = fs.readdirSync(directory);
    
    // Map files to full paths and filter for only files (not directories)
    const filePaths = files
      .map(file => path.join(directory, file))
      .filter(filePath => fs.statSync(filePath).isFile());

    return filePaths;
  } catch (err) {
    console.error('Error reading directory:', err);
    return [];
  }
}

/**
 * Gets all image file paths from a directory
 * @param directory The directory path to scan
 * @returns Array of image file paths
 */
export function getImageFilePaths(directory: string): string[] {
  try {
    const allFiles = getFilePaths(directory);
    
    // Filter for image files only
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    const imagePaths = allFiles.filter(file => 
      imageExtensions.includes(path.extname(file).toLowerCase())
    );

    return imagePaths;
  } catch (err) {
    console.error('Error getting image files:', err);
    return [];
  }
}

/**
 * Validates if a path is a valid image file
 * @param filePath Path to validate
 * @returns boolean indicating if path is valid image file
 */
export function isValidImagePath(filePath: string): boolean {
  try {
    // Check if file exists and is actually a file
    const stats = fs.statSync(filePath);
    if (!stats.isFile()) return false;

    // Check if extension is valid image extension
    const ext = path.extname(filePath).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
  } catch {
    return false;
  }
}
