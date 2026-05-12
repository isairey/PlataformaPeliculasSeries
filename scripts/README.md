## Image to WebP Converter
A high-performance Python script that converts multiple images to WebP format in parallel. This tool processes images from a directory's root (no subdirectories) and converts them to the modern WebP format with configurable quality settings.

### Features
- Parallel processing - Convert multiple images simultaneously
- Root directory only - Processes only files in the specified directory (no subdirectory traversal)
- Multiple format support - PNG, JPEG, BMP, TIFF input formats
- Configurable quality - Adjust WebP compression quality (0-100)
- Alpha channel handling - Automatically handles PNG transparency with white background
- Progress tracking - Real-time conversion status with success/failure reports

### Installation
#### Prerequisites
- Python 3.6 or higher
- pip

#### Dependencies
Install the required package:
```
pip install Pillow
```

### Usage
```
python convert_to_webp.py <input_dir> -o <output_dir> [options]
# Example:
python convert_to_webp.py ./images -o ./webp_images -q 80
```

### Command Line Options

| Option	| Short	| Description	| Default |
| ----------|-------|---------------|---------|
| input_dir |	-	| Input directory containing images (required)	| ./ |
| --output_dir |	-o	| Output directory for WebP files (required)	| ./ |
| --quality	| -q	| WebP quality setting (0-100)	| 80 |
| --jobs	| -j	| Number of parallel conversion jobs	| 4 |

### Output
- All output files are saved as .webp format
- Original filenames are preserved (only extension changes)
- Output directory is created automatically if it doesn't exist
- Only processes files in the root of the input directory (ignores subdirectories)

### License
This script is provided as-is for educational and personal use.