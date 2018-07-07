import { Injectable } from "@angular/core";
import { EventEmitterElectron } from "./event-emitter.electron";
import Dialog = Electron.Dialog;

@Injectable({
  providedIn: "root"
})
export class DialogElectron extends EventEmitterElectron<Dialog> implements Dialog {
  constructor() {
    super(() => window.require("electron").remote.dialog);
  }

  /* tslint:disable:ban-types */
  public showCertificateTrustDialog(browserWindow: Electron.BrowserWindow,
                                    options: Electron.CertificateTrustDialogOptions, callback: Function): void;
  public showCertificateTrustDialog(options: Electron.CertificateTrustDialogOptions, callback: Function): void;
  public showCertificateTrustDialog(browserWindow: Electron.BrowserWindow | Electron.CertificateTrustDialogOptions,
                                    options: Electron.CertificateTrustDialogOptions | Function, callback?: Function): void {
    const args = [
      browserWindow,
      options,
      callback
    ].filter(value => value !== undefined);

    return this.instance.showCertificateTrustDialog.apply(this.instance, args);
  }

  public showErrorBox(title: string, content: string): void {
    this.instance.showErrorBox(title, content);
  }

  public showMessageBox(browserWindow: Electron.BrowserWindow,
                        options: Electron.MessageBoxOptions, callback?: (response: number, checkboxChecked: boolean) => void): number;
  public showMessageBox(options: Electron.MessageBoxOptions, callback?: (response: number, checkboxChecked: boolean) => void): number;
  public showMessageBox(browserWindow: Electron.BrowserWindow | Electron.MessageBoxOptions,
                        options?: Electron.MessageBoxOptions | ((response: number, checkboxChecked: boolean) => void),
                        callback?: (response: number, checkboxChecked: boolean) => void): number {
    const args = [
      browserWindow,
      options,
      callback
    ].filter(value => value !== undefined);

    return this.instance.showMessageBox.apply(this.instance, args);
  }

  public showOpenDialog(browserWindow: Electron.BrowserWindow,
                        options: Electron.OpenDialogOptions, callback?: (filePaths: string[], bookmarks: string[]) => void): string[];
  public showOpenDialog(options: Electron.OpenDialogOptions, callback?: (filePaths: string[], bookmarks: string[]) => void): string[];
  public showOpenDialog(browserWindow: Electron.BrowserWindow | Electron.OpenDialogOptions,
                        options?: Electron.OpenDialogOptions | ((filePaths: string[], bookmarks: string[]) => void),
                        callback?: (filePaths: string[], bookmarks: string[]) => void): string[] {
    const args = [
      browserWindow,
      options,
      callback
    ].filter(value => value !== undefined);

    return this.instance.showOpenDialog.apply(this.instance, args);
  }

  public showSaveDialog(browserWindow: Electron.BrowserWindow, options: Electron.SaveDialogOptions,
                        callback?: (filename: string, bookmark: string) => void): string;
  public showSaveDialog(options: Electron.SaveDialogOptions, callback?: (filename: string, bookmark: string) => void): string;
  public showSaveDialog(browserWindow: Electron.BrowserWindow | Electron.SaveDialogOptions,
                        options?: Electron.SaveDialogOptions | ((filename: string, bookmark: string) => void),
                        callback?: (filename: string, bookmark: string) => void): string {
    const args = [
      browserWindow,
      options,
      callback
    ].filter(value => value !== undefined);

    return this.instance.showSaveDialog.apply(this.instance, args);
  }

  /* tslint:enable:ban-types */

}
