import os
import sys
import argparse
from PIL import Image
import concurrent.futures

def convert_image(input_path, output_path, quality=80):
    """Convert a single image to WebP format"""
    try:
        with Image.open(input_path) as img:
            # Convert to RGB if necessary (for PNG with transparency)
            if img.mode in ('RGBA', 'LA', 'P'):
                # Create a white background
                background = Image.new('RGB', img.size, (255, 255, 255))
                if img.mode == 'P':
                    img = img.convert('RGBA')
                background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
                img = background
            elif img.mode != 'RGB':
                img = img.convert('RGB')
            
            # Create output directory if it doesn't exist
            os.makedirs(os.path.dirname(output_path), exist_ok=True)
            
            # Save as WebP
            img.save(output_path, 'WEBP', quality=quality, method=6)
            print(f"✓ Converted: {os.path.basename(input_path)} -> {os.path.basename(output_path)}")
            return True
            
    except Exception as e:
        print(f"✗ Failed to convert {input_path}: {str(e)}")
        return False

def find_images(directory, extensions=('.png', '.jpg', '.jpeg', '.bmp', '.tiff')):
    """Find all image files in the root directory only (no subdirectories)"""
    image_files = []
    try:
        # Only look in the root directory, not subdirectories
        files = os.listdir(directory)
        for file in files:
            file_path = os.path.join(directory, file)
            # Check if it's a file (not directory) and has valid image extension
            if os.path.isfile(file_path) and file.lower().endswith(extensions):
                image_files.append(file_path)
    except Exception as e:
        print(f"Error reading directory {directory}: {str(e)}")
    
    return image_files

def main():
    parser = argparse.ArgumentParser(description='Convert images to WebP format')
    parser.add_argument('input_dir', help='Input directory containing images to convert')
    parser.add_argument('-o', '--output', required=True, help='Output directory for WebP files')
    parser.add_argument('-q', '--quality', type=int, default=80, help='WebP quality (0-100), default: 80')
    parser.add_argument('-j', '--jobs', type=int, default=4, help='Number of parallel jobs, default: 4')
    
    args = parser.parse_args()
    
    # Validate input directory
    if not os.path.exists(args.input_dir):
        print(f"Error: Input directory '{args.input_dir}' does not exist")
        sys.exit(1)
    
    # Validate quality parameter
    if not 0 <= args.quality <= 100:
        print("Error: Quality must be between 0 and 100")
        sys.exit(1)
    
    print(f"Input directory: {args.input_dir}")
    print(f"Output directory: {args.output}")
    print(f"Quality: {args.quality}")
    print(f"Parallel jobs: {args.jobs}")
    print("-" * 50)
    
    # Find all images in root directory only
    image_files = find_images(args.input_dir)
    
    if not image_files:
        print("No images found in the input directory root")
        sys.exit(1)
    
    print(f"Found {len(image_files)} images to convert")
    
    # Prepare conversion tasks
    conversion_tasks = []
    for input_path in image_files:
        # Get just the filename (not relative path since we're in root)
        filename = os.path.basename(input_path)
        # Change extension to .webp
        name_without_ext = os.path.splitext(filename)[0]
        output_path = os.path.join(args.output, name_without_ext + '.webp')
        conversion_tasks.append((input_path, output_path))
    
    # Convert images in parallel
    successful = 0
    failed = 0
    
    with concurrent.futures.ThreadPoolExecutor(max_workers=args.jobs) as executor:
        future_to_task = {
            executor.submit(convert_image, input_path, output_path, args.quality): (input_path, output_path)
            for input_path, output_path in conversion_tasks
        }
        
        for future in concurrent.futures.as_completed(future_to_task):
            input_path, output_path = future_to_task[future]
            try:
                if future.result():
                    successful += 1
                else:
                    failed += 1
            except Exception as e:
                print(f"✗ Unexpected error converting {input_path}: {str(e)}")
                failed += 1
    
    print("-" * 50)
    print(f"Conversion completed!")
    print(f"Successful: {successful}")
    print(f"Failed: {failed}")
    print(f"Total: {successful + failed}")

if __name__ == "__main__":
    main()