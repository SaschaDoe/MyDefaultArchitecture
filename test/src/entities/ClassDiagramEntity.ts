export class ClassDiagramEntity {
    private _privateFieldsVisible: boolean = false;
    private _animationDuration: number = 500;
    private _timingFunction: string = 'cubic-bezier(0.4, 0, 0.2, 1)';
    private _maxCollapsedHeight: string = '0px';
    private _maxExpandedHeight: string = '500px';

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

    public getTimingFunction(): string {
        return this._timingFunction;
    }

    public getMaxCollapsedHeight(): string {
        return this._maxCollapsedHeight;
    }

    public getMaxExpandedHeight(): string {
        return this._maxExpandedHeight;
    }
} 