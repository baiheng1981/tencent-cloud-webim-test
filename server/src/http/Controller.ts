import lg from '../utils/lg';

import * as fs from "fs";
import * as Router from "koa-router";

import { getFiles } from "../utils/getFiles";

export default class Controller {
    private static _instance:Controller;
    public static i():Controller {
        if (!this._instance) this._instance = new Controller();
        return this._instance;
    }

    public router:Router;
    public files:string[];

    public init(_router:Router): Controller {
        this.router = _router;
        this.files = [];
        return Controller.i();
    }

    public addControllers(_dir:string): Controller {
        this.files = getFiles(_dir);
        lg.success("getFiles:\n", this.files);
        for (let _furl of this.files) {
            let _mapping = require(_furl);
            this.addMapping(_mapping);
        }
        return Controller.i();
    }

    private addMapping(_mapping:{[key:string]: any}): void {
        for (let _url in _mapping) {
            let _urlParse:string[] = _url.split(" ");
            let _method:string = _urlParse[0];
            let _path:string = _urlParse[1];
            switch (_method) {
                case "GET":
                    this.router.get(_path, _mapping[_url]);
                    break;
                case "POST":
                    this.router.post(_path, _mapping[_url]);
                    break;
                default:
                    lg.error(`invalid URL:${_url}`);
            }
        }
    }





}