export class LocalStorage {

    public localStorage: any;

    constructor() {
        if (!localStorage) {
            throw new Error('Current browser does not support Local Storage');
        }
        this.localStorage = localStorage;
    }
    // 存储单个属性
    public set(key: string, value: string): void {
        this.localStorage[key] = value;
    }
    // 存储单个属性
    public get(key: string): string {
        return this.localStorage[key] || false;
    }
    // 存储对象，以JSON格式存储
    public setObject(key: string, value: any): void {
        this.localStorage[key] = JSON.stringify(value);
    }
    // 读取对象
    public getObject(key: string): any {
        return JSON.parse(this.localStorage[key] || '{}');
    }

    public remove(key: string): any {
        this.localStorage.removeItem(key);
    }
}
