/**
interface BuildInfoRecord {
    version: string,
    lifeCycle: string,
    build: number,
    date: Date
}

const buildInfo:BuildInfoRecord = {
    version: "0.1.6",
    lifeCycle: "alpha",
    build: 8,
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
} */

function MailIcon () {
    return <svg role="img" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
        <title>Gmail</title>
        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
    </svg>
    
}

function GithubIcon() {
    return <svg 
        role="img" 
        width="32" 
        height="32" 
        xmlns="http://www.w3.org/2000/svg">
            <title>GitHub</title>
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
    </svg>
}

function ContactInfo() {
    return <div>
        {"버그 제보/기능 제안"}
        <div>
            <a href="https://github.com/fifteenmania/baskin-client">
                <GithubIcon/>
            </a>
            <a href="mailto:ktthee1995@gmail.com">
                <MailIcon/>
            </a>
        </div>
    </div>
}

function Description() {
    return <div>
        <p>널리 알려진 술게임 중 하나인 '배스킨라빈스 31' 의 웹게임입니다.</p>
        <p>본 프로젝트는 배스킨라빈스 아이스크림 프랜차이즈와 무관합니다.</p>
    </div>
}

export default function Footer() {
    return <div>
        <footer className="main-footer">
            <Description/>
            <ContactInfo/>
        </footer>
    </div>
}

