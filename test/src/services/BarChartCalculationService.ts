import { BarSection } from '../entities/BarChartEntity';

export class BarChartCalculationService {
    public calculateInterpolatedSections(
        startSections: BarSection[],
        endSections: BarSection[],
        progress: number
    ): BarSection[] {
        // Get all unique labels
        const allLabels = new Set([
            ...startSections.map(s => s.label),
            ...endSections.map(s => s.label)
        ]);

        // Calculate interpolated sections
        let interpolatedSections = Array.from(allLabels).map(label => {
            const startSection = startSections.find(s => s.label === label);
            const endSection = endSections.find(s => s.label === label);

            if (!startSection && endSection) {
                // New section appearing
                return {
                    label,
                    color: endSection.color,
                    percentage: endSection.percentage * progress
                };
            }
            if (startSection && !endSection) {
                // Section disappearing
                return {
                    label,
                    color: startSection.color,
                    percentage: startSection.percentage * (1 - progress)
                };
            }
            if (startSection && endSection) {
                // Section transitioning
                return {
                    label,
                    color: endSection.color,
                    percentage: startSection.percentage + 
                        (endSection.percentage - startSection.percentage) * progress
                };
            }
            throw new Error(`Invalid section state for label: ${label}`);
        });

        // Remove sections with near-zero percentage
        interpolatedSections = interpolatedSections.filter(section => section.percentage > 0.01);

        // Normalize percentages to ensure they sum to 100
        const total = interpolatedSections.reduce((sum, section) => sum + section.percentage, 0);
        return interpolatedSections.map(section => ({
            ...section,
            percentage: (section.percentage / total) * 100
        }));
    }
} 