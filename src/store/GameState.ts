export class GameState {
  Started: boolean = false;
  Level: number = 0;
  Injured: boolean = false;
  Blessed: boolean = false;
  Blessings: Array<number> = [];
  Injuries: Array<number> = [];
}
