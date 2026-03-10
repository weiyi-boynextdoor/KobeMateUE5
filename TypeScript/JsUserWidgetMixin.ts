import * as UE from "ue";
import { blueprint } from "puerts";
import type { JsClass } from "./JsClass";
import { G, get_registered_class } from "./G";

const BP = UE.Class.Load("/PuertsWrapper/JsUserWidget.JsUserWidget_C");

const BP_Mixin = blueprint.tojs<typeof UE.PuertsWrapper.JsUserWidget.JsUserWidget_C>(BP);

// eslint-disable-next-line @typescript-eslint/no-empty-object-type, @typescript-eslint/no-unsafe-declaration-merging
interface BPExt extends UE.PuertsWrapper.JsUserWidget.JsUserWidget_C {}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
class BPExt {
    js_instance: JsClass;
    PreConstruct(IsDesignTime: boolean) {
        // UE.KismetSystemLibrary.PrintString(this.GetWorld(), "JsUserWidget mixin succeeded: " + this.JsClass);
        const js_class = get_registered_class(this.JsClass, "JsClasses/UI/" + this.JsClass);
        this.js_instance = new js_class();
        this.js_instance.initialize(this);
    }

    Destruct() {
        this.js_instance.deinitialize();
    }
}

blueprint.mixin(BP_Mixin, BPExt, { objectTakeByNative: true });
