export class ClassDiagramEntity {
    private _privateFieldsVisible: boolean = false;
    private _animationDuration: number = 500; // in milliseconds

    constructor() {
        this._privateFieldsVisible = false;
    }

    public togglePrivateFieldsVisibility(): boolean {
        this._privateFieldsVisible = !this._privateFieldsVisible;
        return this._privateFieldsVisible;
    }

    public isPrivateFieldsVisible(): boolean {
        return this._privateFieldsVisible;
    }

    public getAnimationDuration(): number {
        return this._animationDuration;
    }
} 