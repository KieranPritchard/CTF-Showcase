import Background from '../components/Backgrounds/Background'
import ContactLinks from '../components/ContactPage/ContactLinks'

// Contact page with background and list of contact links
function Contact() {
    return (
        <>
            <Background isEven={false}>
                <div className="flex flex-col justify-center items-center h-full">
                    {/* List of contact links (phone, email, linkedin, github) */}
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