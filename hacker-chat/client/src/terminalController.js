import ComponentsBuilder from "./components.js";
 
export default class TerminalController{
   
    constructor(){}

    #onInputRecieved(eventEmitter) {
        return function() {
            const message = this.getValue()
            console.log(message)
            this.clearValue()
        }
    }

    async initializeTable(eventEmitter){ 
        const components = new ComponentsBuilder()
        .setScreen({ title: 'HackerChat - Guilherme Braga'})
        .setLayoutComponent()
        .setInputComponent(this.#onInputRecieved(eventEmitter))
        .setChatComponent()
        .build()

        components.input.focus()
        components.screen.render()
    }

}