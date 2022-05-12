import * as fs from 'fs';
import { promisify } from 'util';

export class FsProxy {
    public fs = fs;

    public existsAsync!: (apth: string) => Promise<boolean>;
    public readdirAsync!: (path: string) => Promise<string[]>;
    public unlinkAsync!: (path: string) => Promise<boolean>

    constructor() {
        this.enableAsync();
    }

    enableAsync() {
        
        this.existsAsync = promisify(this.fs.exists)
            .bind(this.fs);

        this.readdirAsync = promisify(this.fs.readdir)
            .bind(this.fs);

        this.unlinkAsync = promisify(this.fs.unlink)
            .bind(this.fs);
    }
}