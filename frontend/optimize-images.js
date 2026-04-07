import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputDir = 'c:/Users/KRUPESH/Desktop/Photography/frontend/public/images';
const outputDir = 'c:/Users/KRUPESH/Desktop/Photography/frontend/public/images'; // Overwrite

async function optimize() {
    const files = fs.readdirSync(inputDir).filter(f => {
        const ext = path.extname(f).toLowerCase();
        return ext === '.jpg' || ext === '.jpeg';
    });
    
    console.log(`Found ${files.length} images to optimize.`);

    for (const file of files) {
        const inputPath = path.join(inputDir, file);
        const tempPath = path.join(inputDir, `_temp_${file}`);
        
        console.log(`Optimizing ${file}...`);
        
        try {
            await sharp(inputPath)
                .rotate() // Respect EXIF orientation
                .resize({ width: 2560, withoutEnlargement: true }) // Standard web hero width
                .jpeg({ quality: 80, progressive: true, mozjpeg: true })
                .toFile(tempPath);
            
            // Stats comparison
            const oldSize = fs.statSync(inputPath).size;
            const newSize = fs.statSync(tempPath).size;
            
            fs.renameSync(tempPath, inputPath); // Replace original
            
            console.log(`  Done: ${(oldSize / 1024 / 1024).toFixed(2)}MB -> ${(newSize / 1024 / 1024).toFixed(2)}MB (${((1 - (newSize / oldSize)) * 100).toFixed(1)}% reduction)`);
        } catch (err) {
            console.error(`  Error optimizing ${file}:`, err);
        }
    }
}

optimize();
