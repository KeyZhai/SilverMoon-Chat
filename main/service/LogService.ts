import { IPC_EVENTS } from "@common/constants";
import { promisify } from "util";
import { app, ipcMain } from "electron";
import log from "electron-log";
import * as path from "path";
import * as fs from "fs";

class LogService {
  private static _instance: LogService;

  private constructor() {
    const logPath = path.join(app.getPath("userData"), "logs");
    //userData => c:users/{username}/AppData/Roaming/{appName}/logs

    //创建日志目录
    try {
      if (!fs.existsSync(logPath)) {
        fs.mkdirSync(logPath, { recursive: true });
      }
    } catch (err) {
      console.error("Failed to create log directory", err);
    }

    log.transports.file.resolvePathFn = () => {
      //使用当前日期作为日志文件名，格式为 log-YYYY-MM-DD.log
      const today = new Date();
      const formattedDate = `${today.getFullYear()}-${String(
        today.getMonth() + 1
      ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
      return path.join(logPath, `log-${formattedDate}.log`);
    };

    //配置日志格式文件
    log.transports.file.format = "[{y}:{m}:{d} {h}:{i}:{s}] [{level}] {text}";

    //配置日志文件大小限制
    log.transports.file.maxSize = 10 * 1024 * 1024; // 10MB

    //配置控制台日志级别，开发环境可以设置 debug，生产环境可以设置 info
    log.transports.console.level =
      process.env.NODE_ENV === "development" ? "debug" : "info";

    //配置文件日志级别
    log.transports.file.level = "debug";
  }

  public static getInstance(): LogService {
    if (!this._instance) {
      this._instance = new LogService();
    }
    return this._instance;
  }
}

export const logManager = LogService.getInstance();
export default logManager;
