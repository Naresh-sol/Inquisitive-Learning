export default function IconBtn({ text, onclick, children, disabled, outline = false, customClasses, type, }) {
    return (
        <button
            disabled={disabled}
            onClick={onclick}
            className={`flex items-center justify-center outline-none ${outline ? "border border-[#0056D2] text-[#0056D2] bg-transparent hover:bg-[#0056D2] hover:text-white" : "bg-[#0056D2] text-white hover:bg-[#004bb5]"
                } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold transition-colors duration-300 shadow-sm ${customClasses}`}
            type={type}
        >
            {
                children ? (
                    <>
                        <span className={`${outline && "text-current"}`}>{text}</span>
                        {children}
                    </>
                ) :
                    (text)
            }
        </button>
    )
}