import { ReactNode } from "react"
import './style.css'

export default function TabDescription(props: {children: ReactNode}) {
    const {children} = props;
    return <div className="description-container">
        {children}
    </div>
}