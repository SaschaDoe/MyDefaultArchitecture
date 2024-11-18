import { ClassDiagramEntity } from '../entities/ClassDiagramEntity';

export class ClassDiagramService {
    private entity: ClassDiagramEntity;

    constructor() {
        this.entity = new ClassDiagramEntity();
    }

    public handleDiagramClick(): boolean {
        return this.entity.togglePrivateFieldsVisibility();
    }

    public getAnimationDuration(): number {
        return this.entity.getAnimationDuration();
    }

    public getTimingFunction(): string {
        return this.entity.getTimingFunction();
    }

    public getMaxCollapsedHeight(): string {
        return this.entity.getMaxCollapsedHeight();
    }

    public getMaxExpandedHeight(): string {
        return this.entity.getMaxExpandedHeight();
    }
} 