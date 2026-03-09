import * as UE from "ue";
import { argv } from "puerts";
import { G } from "./G";

console.log("init from ts begin");

import "./JsUserWidgetMixin";

const game_instance = argv.getByName("GameInstance") as UE.GameInstance;
G.game_instance = game_instance;

console.log("init from ts end");
