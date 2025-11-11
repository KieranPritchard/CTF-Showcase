import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// This script generates a manifest.json file listing all .md files
// in the Contents directory of your CTF-Write-Ups repository (including subdirectories)
// Run this script and commit the manifest.json to your repo

// You can modify this path to point to your local CTF-Write-Ups repo
const contentsPath = path.join(__dirname, '../../CTF-Write-Ups/Contents')

// Or if the repo is elsewhere, uncomment and set the path:
// const contentsPath = '/path/to/your/CTF-Write-Ups/Contents'

// Recursive function to find all .md files
function findMarkdownFiles(dir, baseDir = dir, fileList = []) {
    const files = fs.readdirSync(dir)
    
    files.forEach(file => {
        const filePath = path.join(dir, file)
        const stat = fs.statSync(filePath)
        
        if (stat.isDirectory()) {
            // Recursively search in subdirectories
            findMarkdownFiles(filePath, baseDir, fileList)
        } else if (file.endsWith('.md') && file !== 'manifest.json') {
            // Get relative path from Contents directory
            const relativePath = path.relative(baseDir, filePath)
            // Normalize path separators to forward slashes (for GitHub)
            const normalizedPath = relativePath.replace(/\\/g, '/')
            fileList.push(normalizedPath)
        }
    })
    
    return fileList
}

try {
    if (!fs.existsSync(contentsPath)) {
        throw new Error(`Contents directory not found at: ${contentsPath}`)
    }
    
    const mdFiles = findMarkdownFiles(contentsPath)
    
    if (mdFiles.length === 0) {
        console.warn('⚠️  No markdown files found in Contents directory')
        console.log('   Make sure you have .md files in the Contents folder or its subdirectories')
        process.exit(1)
    }
    
    const manifest = {
        files: mdFiles.sort()
    }
    
    const manifestPath = path.join(contentsPath, 'manifest.json')
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2))
    
    console.log(`✅ Generated manifest.json with ${mdFiles.length} files:`)
    mdFiles.forEach(file => console.log(`   - ${file}`))
    console.log(`\n📁 Saved to: ${manifestPath}`)
    console.log(`\n💡 Next step: Commit this file to your GitHub repository`)
} catch (error) {
    console.error('❌ Error generating manifest:', error.message)
    console.log('\n💡 Make sure the Contents directory exists and contains .md files')
    console.log('   You may need to update the contentsPath in this script')
    process.exit(1)
}

