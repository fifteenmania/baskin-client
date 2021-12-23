import { useEffect, useState } from "react"

function ipIsValid(ip: string): boolean {
    const ipValidator=/^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
    const match = ipValidator.exec(ip);
    return !!match
}

export default function Multiplay() {
    const [connectionStatus, setConnectionStatus] = useState<string>("before connection");
    const serverAddress = "ws://localhost:8080"
    useEffect(() => {
        const socket = new WebSocket(serverAddress)
        setConnectionStatus("waiting connection...")
        socket.onopen = (event) => {
            setConnectionStatus("connected.")
            socket.send("Hello world!")
        }
        return () => socket.close();
    }, [])
    return <div> 
        멀티플레이 메뉴입니다. 구현 예정입니다.
        <div>
            {` 연결 상태: ${connectionStatus}`}
        </div>
    </div>
}
