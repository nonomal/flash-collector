import {Err, Ok, Result} from "ts-results";
import {getConfig} from "./config";
import {Notification} from "electron"
import {GameInfo} from "../class";
import path from "path";
import shelljs from "shelljs";
import Downloader from "nodejs-file-downloader";
import fs from "fs";

const CDP = require('chrome-remote-interface');

async function sniffing(url: string, info: GameInfo): Promise<Result<string[], string>> {
    const port = (await getConfig()).smartSniffing.port
    let working = true
    return new Promise(async (res) => {
        const base = getBase(url)
        let client,
            resource: string[] = []
        try {
            client = await CDP({
                port
            });
            const {Network, Page} = client
            Network.requestWillBeSent(async (params: any) => {
                if (!working) return
                console.log(params.request.url)
                let r = await fetchResource(params.request.url, base, info)
                if (r) resource.push(params.request.url)
            });
            await Network.enable()
            client.on('disconnect', () => {
                working = false
                if (resource.length > 0) showNotification("资源嗅探成功", `嗅探到${resource.length}个新资源`)
                res(new Ok(resource))
            })
            await Page.enable();
            await Page.navigate({url});
            await Page.loadEventFired();
            showNotification("正在嗅探异步加载的 Flash 资源", "嗅探过程中浏览器可能会卡顿，关闭浏览器以结束嗅探")
            await Page.disable()
        } catch (err) {
            showNotification("资源嗅探失败", "请先关闭启动浏览器再点击“源站播放”")
            res(new Err(JSON.stringify(err)))
        }
    })
}

function showNotification(title: string, body: string) {
    new Notification({title, body}).show()
}

function getBase(url: string): string {
    let sp = url.split("/")
    return url.replace(sp[sp.length - 1], "")
}

async function fetchResource(url: string, base: string, info: GameInfo): Promise<boolean> {
    if (url.indexOf(base) == -1 || info.local == null) {
        return false
    } else {
        //解析本地路径
        let localPath = url.replace(base, path.join("games", info.type, info.local.folder) + "/").replace(/\\/g, "/").split("#")[0],
            localBase = getBase(localPath)
        if (fs.existsSync(localPath)) return false
        if (!fs.existsSync(localBase)) shelljs.mkdir('-p', localBase)
        //下载此文件
        const d = new Downloader({
            url,
            directory: localBase,
            headers: {
                'user-agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
                referer: info.online.originPage
            },
            onBeforeSave() {
                return localPath.replace(localBase, "")
            }
        })
        try {
            await d.download();
            return true
        } catch (error) {
            console.log(`Error:Can't download ${url}`)
            console.log(error);
            return false
        }
    }
}

export {
    sniffing
}
