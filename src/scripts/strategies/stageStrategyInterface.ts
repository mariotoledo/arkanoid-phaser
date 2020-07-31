import StageStrategyConfig from './stageStrategyConfig';

export default interface StageStrategyInterface {
    generateStageData(stageStrategyConfig: StageStrategyConfig): number[][];
}