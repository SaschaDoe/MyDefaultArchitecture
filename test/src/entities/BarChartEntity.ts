export interface BarSection {
    label: string;
    percentage: number;
    color: string;
}

export type Orientation = 'horizontal' | 'vertical';

export class BarChartEntity {
    private _sections: BarSection[] = [];
    private _animationDuration: number = 400;
    private _timingFunction: string = 'cubic-bezier(0.4, 0, 0.2, 1)';
    private _orientation: Orientation = 'horizontal';
    private _barHeight: number = 40;

    constructor() {}

    public validateSections(sections: BarSection[]): boolean {
        const totalPercentage = sections.reduce((sum, section) => sum + section.percentage, 0);
        return Math.abs(totalPercentage - 100) < 0.01; // Allow for small floating point errors
    }

    public setSections(sections: BarSection[]): void {
        if (!this.validateSections(sections)) {
            throw new Error('Section percentages must sum to 100');
        }
        this._sections = sections;
    }

    public getSections(): BarSection[] {
        return this._sections;
    }

    public getAnimationDuration(): number {
        return this._animationDuration;
    }

    public getTimingFunction(): string {
        return this._timingFunction;
    }

    public setOrientation(orientation: Orientation): void {
        this._orientation = orientation;
    }

    public getOrientation(): Orientation {
        return this._orientation;
    }

    public getBarHeight(): number {
        return this._barHeight;
    }
} 