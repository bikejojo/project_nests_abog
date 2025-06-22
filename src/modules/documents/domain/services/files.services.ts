import { Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload';
import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';

@Injectable()
export class FilesService {
    private readonly uploadDir = path.join('public','documentsCase');
    
    async uploadFileService(id: number , file:Promise<FileUpload>, type:number): Promise<string> {
        try { 
            const { filename , mimetype, encoding, createReadStream } = await file;

            if (!filename || filename.trim() === '') {
                throw new Error('Nombre de archivo inválido');
            }

            const folder = type === 1 ? `${id}/image` : `${id}/documents`;
            const destDir = path.join(process.cwd(), this.uploadDir, folder);
            await fs.promises.mkdir(destDir, { recursive: true });

            const uniqueFilename = `${Date.now()}-${filename}`;
            const fullPath = path.join(destDir, uniqueFilename);
            //console.log(fullPath)
            const stream = createReadStream() as NodeJS.ReadableStream;

            if(type === 1 && mimetype.startsWith('image/')) {
                const buffer = await this.streamToBuffer(stream);
                await sharp(buffer)
                    .resize({ width: 1024 }) 
                    .png({ compressionLevel: 8 }) // puedes ajustar
                    .toFile(fullPath);
            } else {
                await new Promise<void>((resolve, reject) => {
                    const write = fs.createWriteStream(fullPath);
                    stream.pipe(write);
                    write.on('finish', () => resolve());
                    write.on('error', reject);
                });
            }

            return `public/documentsCase/${folder}/${uniqueFilename}`;

        }catch (err) {
            console.log('Fallas al subir archivos y esto es debido: ' + err.message );
            return '';
        }
    }

    private async streamToBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
        const chunks: Buffer[] = [];
        return new Promise((resolve, reject) => {
            stream.on('data', (chunk) => chunks.push(chunk));
            stream.on('end', () => resolve(Buffer.concat(chunks)));
            stream.on('error', reject);
        });
    }

}