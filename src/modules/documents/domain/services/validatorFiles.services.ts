import { Injectable, BadRequestException } from '@nestjs/common';
import { rejects } from 'assert';
import { Readable } from 'stream';
import { FileUpload } from 'graphql-upload';

@Injectable()
export class ValidatorFilesService {
    private readonly maxSizePhoto = 20 * 1024 * 1024; // 20 MB
    private readonly maxSizeDocument = 5 * 1024 * 1024; // 5 MB
    private readonly allowedMimeTypes = [
        'image/jpeg',
        'image/png',
        'application/pdf',
    ]
    private readonly allowedTypesExtensions = [ '.jpeg', '.png', '.jpg' , '.pdf' ];

    async validation(file:Promise<FileUpload>): Promise<true> {
        const { filename, mimetype, createReadStream } = await file;

        const ext = this.getExtension(filename);

        if(!this.allowedTypesExtensions.includes(ext)){
            throw new BadRequestException(
                `Extension no permitida: ${ext}. Solo permite: ${this.allowedTypesExtensions.join(', ')}.`,
            );
        }

        if(!this.allowedMimeTypes.includes(mimetype)){
            throw new BadRequestException(
                `Tipo MIME no permitido: ${mimetype}. Solo permite: ${this.allowedMimeTypes.join(', ')}.`,
            );

        }

        const maxAllowed = mimetype.startsWith('image/') ? this.maxSizePhoto : this.maxSizeDocument;
        const stream = createReadStream() as Readable;
        let totalSize = 0;

        await new Promise((resolve,reject)=> {
            stream.on('data',( chunk )=>{
                totalSize += chunk.length;
                if (totalSize > maxAllowed) {
                    stream.destroy(); // Este método existe en `stream.Readable`
                    reject(
                        new BadRequestException(
                        `El archivo excede el tamaño permitido: ${
                            maxAllowed / (1024 * 1024)
                        }MB.`,
                        ),
                    );
                }
            });
            stream.on('end', resolve);
            stream.on('error', reject);
        })
        return true;
    }

    private getExtension(filename: string ) : string {
        return filename.substring(filename.lastIndexOf('.')).toLowerCase();
    }
}