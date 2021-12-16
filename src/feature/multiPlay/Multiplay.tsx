import { useEffect } from "react"

export default function Multiplay() {
    const serverAddress = "ws://localhost:8080"
    useEffect(() => {
        const socket = new WebSocket(serverAddress)
        socket.onopen = (event) => {
            socket.send("Hello world!")
            socket.onmessage = (msg) => {
                console.log(msg.data)
            }
        }
        return () => socket.close();
    }, [])
    return <div> 
        멀티플레이 메뉴입니다.
    </div>
}
