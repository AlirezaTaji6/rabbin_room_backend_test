import * as fs from 'fs';
import { promisify } from 'util';

export class FsProxy {
    public fs = fs;

    public existsAsync!: (apth: string) => Promise<boolean>;
    public readdirAsync!: (path: string) => Promise<string[]>;
    public unlinkAsync!: (path: string) => Promise<void>
    public readFileAsync!: (path: string) => Promise<Buffer>
    public writeFileAsync!: (path: string, buf: Buffer) => Promise<void>

    constructor() {
        this.enableAsync();
    }

    enableAsync() {
        
        this.existsAsync = promisify(this.fs.exists)
            .bind(this.fs);
        
        this.readFileAsync = promisify(this.fs.readFile)
            .bind(this.fs);

        this.writeFileAsync = promisify(this.fs.writeFile)
            .bind(this.fs);

        this.readdirAsync = promisify(this.fs.readdir)
            .bind(this.fs);

        this.unlinkAsync = promisify(this.fs.unlink)
            .bind(this.fs);
    }
}