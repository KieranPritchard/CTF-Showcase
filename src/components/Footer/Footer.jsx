import Icon from '../../assets/icon.png'

export default function Footer() {
    return (
        <footer className="w-full bg-[#0A0F14] text-white">
            <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col items-center">
                <div className="flex items-center space-x-3 mb-6">
                    <img alt="" className="h-11"
                        src={Icon} />
                </div>
                <p className="text-center max-w-xl text-sm font-normal text-body leading-relaxed">
                    A comprehensive compilation of diverse projects and resources pertinent to my proficiency and capabilities on CTF platforms, designed for instructional purposes and facilitating the responsible utilisation of ethical hacking methodologies.
                </p>
            </div>
            <div className="border-t border-[#00FF88]">
                <div className="max-w-7xl mx-auto px-6 py-6 text-center font-normal text-body">
                    <p className='text-[#00FF88] headings mb-2 text-lg'>Kieran Pritchard ©2025. All rights reserved.</p>
                    <p className='text-sm'>All copyrighted materials are the property of their respective owners. Used here for portfolio demonstration purposes only.</p>
                </div>
            </div>
        </footer>
    );
};