function Skills(){
    return(
        <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 py-10 w-full">
            <h2 className="headings flicker text-white text-3xl sm:text-4xl font-bold mb-10">Skills</h2>
            {/* Two-column layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 w-full max-w-6xl">
                
                {/* Image Section */}
                <div className="md:w-auto text-center flex flex-col justify-center w-full">
                    <ul className="text-body list-disc text-[#C7FCEC] text-left">
                        <li>Nmap</li>
                        <li>Linux</li>
                        <li>Kali Linux</li>
                        <li>VirtualBox</li>
                        <li>Problem Solving</li>
                        <li>Ethical Hacking</li>
                        <li>Netcat</li>
                        <li>Research Skills</li>
                        <li>John the Ripper</li>
                        <li>Hydra</li>
                        <li>Gobuster</li>
                    </ul>
                </div>

                {/* Text Section */}
                <div className="w-full md:w-auto text-center">
                    <ul className="text-body list-disc text-[#C7FCEC] text-left ">
                        <li>Vulnerability Scanning</li>
                        <li>Vulnerability Research</li>
                        <li>Reconnaissance</li>
                        <li>SQL</li>
                        <li>Windows</li>
                        <li>Reporting</li>
                        <li>Penetration Testing</li>
                        <li>Cybersecurity Tools</li>
                        <li>Security Awareness</li>
                        <li>Note Taking</li>
                        <li>OWASP</li>
                        <li>Burp Suite</li>
                        <li>Web Application Security</li>
                        <li>Database Security</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Skills