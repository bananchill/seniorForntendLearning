import AppController from "@/app/AppController";
import InputFile from "@/component/input/file/InputFile";
import InputText from "@/component/input/text/InputText";
import {EventBus} from "@/app/event/EvetBus";

const app = new AppController('#app', {
    components: [InputText, InputFile],
    bus: new EventBus()
})
app.start()