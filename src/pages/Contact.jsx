import Background from '../components/Background'

function Contact(){
    return(
        <>
            <Background isEven={false}>
                <div className="flex flex-col justify-center items-center h-full">
                    <ul>
                        <li className='text-2xl mb-5 text-[#C7FCEC]'>
                            <span class="bg-[#00FF88] text-[#0A0F14] rounded-full w-12 h-12 mr-2 inline-flex items-center justify-center">
                                k
                            </span>
                            +xx xxxxx xxxxxx
                        </li>
                        <li className='text-2xl mb-5 text-[#C7FCEC]'>
                            <span class="bg-[#00FF88] text-[#0A0F14] rounded-full w-12 h-12 mr-2 inline-flex items-center justify-center">
                                k
                            </span>
                            +xx xxxxx xxxxxx
                        </li>
                        <li className='text-2xl text-[#C7FCEC]'>
                            <span class="bg-[#00FF88] text-[#0A0F14] rounded-full w-12 h-12 mr-2 inline-flex items-center justify-center">
                                k
                            </span>
                            +xx xxxxx xxxxxx
                        </li>
                    </ul>
                </div>
            </Background>
        </>
    )
}

export default Contact