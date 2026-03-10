import * as UE from "ue";
import { blueprint } from "puerts";
import type { JsClass } from "./JsClass";
import { G, get_registered_class } from "./G";

const BP = UE.Class.Load("/PuertsWrapper/JsComponent.JsComponent_C");

const BP_Mixin = blueprint.tojs<typeof UE.PuertsWrapper.JsComponent.JsComponent_C>(BP);

// eslint-disable-next-line @typescript-eslint/no-empty-object-type, @typescript-eslint/no-unsafe-declaration-merging
interface BPExt extends UE.PuertsWrapper.JsComponent.JsComponent_C {}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
class BPExt {
    js_instance: JsClass;
    ReceiveBeginPlay() {
        if (!this.JsClass) {
            return;
        }
        // UE.KismetSystemLibrary.PrintString(this.GetWorld(), "JsComponent mixin succeeded: " + this.JsClass);
        const js_class = get_registered_class(this.JsClass, "JsClasses/" + this.JsClass);
        this.js_instance = new js_class();
        this.js_instance.initialize(this);
    }

    ReceiveEndPlay(EndPlayReason: UE.EEndPlayReason) {
        if (this.js_instance) {
            this.js_instance.deinitialize();
        }
    }
}

blueprint.mixin(BP_Mixin, BPExt, { objectTakeByNative: true });
