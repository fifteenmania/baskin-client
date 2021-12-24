
/**
function ipIsValid(ip: string): boolean {
    const ipValidator=/^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
    const match = ipValidator.exec(ip);
    return !!match
} */

export default function Multiplay() {
    /**
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
    }, [])**/
    return <div> 
        서버에 접속하여 다른 사람과 플레이합니다. 구현 예정입니다.
        <div>
        </div>
    </div>
}
