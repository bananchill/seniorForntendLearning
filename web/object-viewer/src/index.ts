import AppController from "@/app/app-controller";
import {EventBus} from "@core/evet-bus";
import {Dom} from "@core/Dom";


const app = new AppController(new EventBus(), new Dom('#app'))
app.render()