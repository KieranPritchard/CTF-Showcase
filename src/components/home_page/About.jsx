function About() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-8 py-10 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 w-full max-w-6xl">
                {/* Optional Image Section */}
                <div className="flex justify-center md:justify-start">
                    <img 
                        src="/path-to-image.jpg" 
                        alt="About image" 
                        className="w-full max-w-sm rounded-lg shadow-lg"
                    />
                </div>

                {/* Text Section */}
                <div className="w-full md:w-auto text-center">
                    <h2 className="headings flicker text-white text-3xl sm:text-4xl font-bold mb-4">About</h2>
                    <p className="text-body text-lg sm:text-xl text-[#C7FCEC] leading-relaxed">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates,
                        nemo, ex ullam similique minima, illo perferendis vel voluptatum et
                        assumenda dicta! Aperiam, alias quaerat? Sint itaque alias esse sed
                        rerum?
                    </p>
                </div>
            </div>
        </div>
    );
}

export default About;
