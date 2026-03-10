import * as UE from "ue";
import { JsClass } from "../JsClass";

export class BP_StreamableAudio extends JsClass {
    initialize(Object: UE.Object): void {
        console.log("BP_StreamableAudio initialized with object: ", Object);
    }

    deinitialize(): void {
        console.log("BP_StreamableAudio deinitialized");
    }
}
