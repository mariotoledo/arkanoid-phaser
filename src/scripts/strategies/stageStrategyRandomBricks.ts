import StateStrategyInterface from './stageStrategyInterface';
import StateStrategyConfig from './stageStrategyConfig';
import BrickType from '../objects/brickType';

import arrayHelper from '../utils/arrayHelper';

export default class StageStrategyRandomBricks implements StateStrategyInterface {
    generateStageData(stageStrategyConfig: StateStrategyConfig): number[][] {
        let rawStageData: number[] = [];
        const redBricks = Array(stageStrategyConfig.redBricksCount).fill(BrickType.Red);
        const yellowBricks = Array(stageStrategyConfig.yellowBricksCount).fill(BrickType.Yellow);
        const blueBricks = Array(stageStrategyConfig.redBricksCount).fill(BrickType.Blue);

        rawStageData = rawStageData.concat([], redBricks, yellowBricks, blueBricks);
        arrayHelper.shuffleArray(rawStageData);

        let chunckSize = Math.floor((redBricks.length + yellowBricks.length + blueBricks.length) / 3)

        const chunckedData = arrayHelper.splitArray(rawStageData, chunckSize);

        return chunckedData;
    }
}