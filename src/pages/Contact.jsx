import Background from '../components/Background'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {faGithub, faLinkedin} from "@fortawesome/free-brands-svg-icons"

function Contact() {
    return (
        <>
            <Background isEven={false}>
                <div className="flex flex-col justify-center items-center h-full">
                    <ul>
                        <li className='text-body text-2xl mb-5 text-[#C7FCEC]'>
                            <span className="bg-[#00FF88] text-[#0A0F14] rounded-full w-12 h-12 mr-2 inline-flex items-center justify-center">
                                <FontAwesomeIcon icon={faPhone} />
                            </span>
                            +44 07763 534145
                        </li>

                        <li className='text-body text-2xl mb-5 text-[#C7FCEC]'>
                            <span className="bg-[#00FF88] text-[#0A0F14] rounded-full w-12 h-12 mr-2 inline-flex items-center justify-center">
                                <FontAwesomeIcon icon={faEnvelope} />
                            </span>
                            KieranPritchard06@gmail.com
                        </li>

                        <li className='text-body text-2xl mb-5 text-[#C7FCEC]'>
                            <span className="bg-[#00FF88] text-[#0A0F14] rounded-full w-12 h-12 mr-2 inline-flex items-center justify-center">
                                <FontAwesomeIcon icon={faGithub} />
                            </span>
                            https://github.com/KieranPritchard
                        </li>

                        <li className='text-body text-2xl text-[#C7FCEC]'>
                            <span className="bg-[#00FF88] text-[#0A0F14] rounded-full w-12 h-12 mr-2 inline-flex items-center justify-center">
                                <FontAwesomeIcon icon={faLinkedin} />
                            </span>
                            https://www.linkedin.com/in/kieran-pritchard/
                        </li>
                    </ul>
                </div>
            </Background>
        </>
    )
}

export default Contact