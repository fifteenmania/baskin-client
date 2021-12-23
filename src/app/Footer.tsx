
interface BuildInfo {
    version: string,
    lifeCycle: string,
    build: number,
    date: Date
}

const buildInfo:BuildInfo = {
    version: "0.1.4",
    lifeCycle: "alpha",
    build: 7,
    date: new Date("2021-12-23")
}

function BuildInfo() {
    return <div>
        <div>
            {`버전 ${buildInfo.version} - ${buildInfo.lifeCycle}`}
        </div>
        <div>
            {`빌드 번호 ${buildInfo.build}`}
        </div>
        <div>
            {`배포일 ${buildInfo.date}`}
        </div>
    </div>
}

function ContactInfo() {
    return <div>
        {"버그 제보/기능 제안 : "}
        <a href="mailto:ktthee1995@gmail.com">
            {"fifteenmania"}
        </a>
        <div>
            {"본 프로젝트는 배스킨라빈스 아이스크림 프랜차이즈와 무관합니다."}
        </div>
    </div>
}

export default function Footer() {
    return <footer className="main-footer">
        <div>
            <h2>{"배스킨라빈스 31 웹게임 "}</h2>
        </div>
        <BuildInfo/>
        <ContactInfo/>
    </footer>
}

