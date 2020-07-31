import StateStrategyInterface from './stageStrategyInterface';
import StateStrategyConfig from './stageStrategyConfig';
import BrickType from '../objects/brickType';

export default class StageStrategyOrderedBricks implements StateStrategyInterface {
    generateStageData(stageStrategyConfig: StateStrategyConfig): number[][] {
        const stageData: number[][] = [];

        const redBricks = Array(stageStrategyConfig.redBricksCount).fill(BrickType.Red);
        const yellowBricks = Array(stageStrategyConfig.yellowBricksCount).fill(BrickType.Yellow);
        const blueBricks = Array(stageStrategyConfig.blueBricksCount).fill(BrickType.Blue);

        stageData.push(blueBricks);
        stageData.push(yellowBricks);
        stageData.push(redBricks);

        return stageData;
    }
}