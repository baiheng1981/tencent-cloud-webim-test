import * as fs from 'fs';
import * as path from 'path';
import lg from './lg';

let basePath = '';
let recurFiles = (_path, _list) => {
    let files = fs.readdirSync(_path);
    if(files){
        for(let i=files.length-1; i>=0; i--){
            let filename = files[i];
            let fullname = path.join(_path, filename);
            let stats = fs.statSync(fullname);
            if(stats.isFile()){
                _list.push(fullname);
            }else if(stats.isDirectory()){
                recurFiles(fullname, _list);
            }
            if(i==0){
                return _list;
            }
        }
    }else {
        lg.error('no files --->',_path);
    }
}

let getFiles = (_path) => {
    basePath = _path;
    let list = recurFiles(basePath, []);
    return list;
}

export { getFiles }