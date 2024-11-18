import { BarChartEntity, BarSection, Orientation } from '../entities/BarChartEntity';

export class BarChartService {
    private entity: BarChartEntity;

    constructor() {
        this.entity = new BarChartEntity();
    }

    public setSections(sections: BarSection[]): void {
        this.entity.setSections(sections);
    }

    public getSections(): BarSection[] {
        return this.entity.getSections();
    }

    public getAnimationDuration(): number {
        return this.entity.getAnimationDuration();
    }

    public getTimingFunction(): string {
        return this.entity.getTimingFunction();
    }

    public setOrientation(orientation: Orientation): void {
        this.entity.setOrientation(orientation);
    }

    public getOrientation(): Orientation {
        return this.entity.getOrientation();
    }

    public getBarHeight(): number {
        return this.entity.getBarHeight();
    }
} 