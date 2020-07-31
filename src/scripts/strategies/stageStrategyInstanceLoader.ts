import StageStrategyOrderedBricks from './stageStrategyOrderedBricks';
import StageStrategyRandomBricks from './stageStrategyRandomBricks';

export default class StateStrategyInstanceLoader {
    getInstance(instanceType: string) {
        switch(instanceType){
            case 'random': 
                return new StageStrategyRandomBricks();
            default:
                return new StageStrategyOrderedBricks();
        }
    }
}