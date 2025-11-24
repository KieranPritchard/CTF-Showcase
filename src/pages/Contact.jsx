import Background from '../components/backgrounds/Background'
import ContactLinks from '../components/contact/ContactLinks'

function Contact() {
    return (
        <>
            <Background isEven={false}>
                <div className="flex flex-col justify-center items-center h-full">
                    <ul>
                        <ContactLinks text={"+44 07763 534145"} icon={"phone"} />
                        <ContactLinks text={"KieranPritchard06@gmail.com"} icon={"email"} />
                        <ContactLinks text={"Linkedin"} link={"https://www.linkedin.com/in/kieran-pritchard/"} icon={"linkedin"}/>
                        <ContactLinks text={"GitHub"} link={"https://github.com/KieranPritchard"} icon={"github"} />
                    </ul>
                </div>
            </Background>
        </>
    )
}

export default Contact