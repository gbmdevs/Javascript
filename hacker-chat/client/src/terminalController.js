import ComponentsBuilder from "./components.js";
 
export default class TerminalController{
    #userCollors = new Map()

    constructor(){}

    // Gera cores aleatorias
    // Estudar essa instrução depois
    #pickCollor(){
        return `#${((1 << 24) * Math.random() | 0).toString(16)}-fg`
    }

    #getUserCollor(userName){
        if(this.#userCollors.has(userName)) return this.#userCollors.get(userName)

        const collor = this.#pickCollor()
        this.#userCollors.set(userName, collor)

        return collor
    }



    #onInputRecieved(eventEmitter) {
        return function() {
            const message = this.getValue()
            console.log(message)
            this.clearValue()
        }
    }

    #onMessageReceived({ screen, chat }){
        
        return msg => {
            const { userName , message } = msg
            const collor = this.#getUserCollor(userName);
           chat.addItem(`{${collor}}{bold}${userName}{/}: ${message}`)
           screen.render()
        }
    }

    #registerEvents(eventEmitter, components){ 
        eventEmitter.on('message:received', this.#onMessageReceived(components))

    }

    async initializeTable(eventEmitter){ 
        const components = new ComponentsBuilder()
        .setScreen({ title: 'HackerChat - Guilherme Braga'})
        .setLayoutComponent()
        .setInputComponent(this.#onInputRecieved(eventEmitter))
        .setChatComponent()
        .build()

        this.#registerEvents(eventEmitter, components)

        components.input.focus()
        components.screen.render()

        // Intervalo de Mensagens
        
        setInterval(() => {
           eventEmitter.emit('message:received', {message: 'Ola', userName: 'Jamal'})
           eventEmitter.emit('message:received', {message: 'Fala Galera', userName: 'Maria'})
           eventEmitter.emit('message:received', {message: 'Cheguei agora', userName: 'Pedrozinho2k'})
        }, 2000); 

    }

}