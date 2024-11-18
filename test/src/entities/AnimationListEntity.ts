export interface AnimationState<T> {
    state: T;
    duration: number;  // Duration in milliseconds
}

export class AnimationListEntity<T> {
    private _states: AnimationState<T>[] = [];
    private _currentIndex: number = 0;

    constructor(states: AnimationState<T>[]) {
        if (states.length === 0) {
            throw new Error('Animation list must contain at least one state');
        }
        this._states = states.map(state => ({
            ...state,
            duration: Math.min(state.duration, 400)
        }));
    }

    public getCurrentState(): AnimationState<T> {
        return this._states[this._currentIndex];
    }

    public getNextState(): AnimationState<T> {
        const nextIndex = (this._currentIndex + 1) % this._states.length;
        return this._states[nextIndex];
    }

    public advance(): AnimationState<T> {
        this._currentIndex = (this._currentIndex + 1) % this._states.length;
        return this.getCurrentState();
    }

    public getStatesCount(): number {
        return this._states.length;
    }

    public reset(): void {
        this._currentIndex = 0;
    }
} 