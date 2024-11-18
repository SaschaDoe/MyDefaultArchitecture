import { AnimationListEntity, AnimationState } from '../entities/AnimationListEntity';
import { BarSection } from '../entities/BarChartEntity';

export class AnimatedBarChartService {
    private animationList: AnimationListEntity<BarSection[]>;
    private isAnimating: boolean = false;

    constructor(states: AnimationState<BarSection[]>[]) {
        this.animationList = new AnimationListEntity<BarSection[]>(states);
    }

    public getCurrentState(): AnimationState<BarSection[]> {
        return this.animationList.getCurrentState();
    }

    public advance(): AnimationState<BarSection[]> {
        return this.animationList.advance();
    }

    public setAnimating(animating: boolean): void {
        this.isAnimating = animating;
    }

    public isCurrentlyAnimating(): boolean {
        return this.isAnimating;
    }
} 