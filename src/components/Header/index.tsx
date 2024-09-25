import Logo from "@/app/icon.png"
import Image from "next/image"

const Header = () => {
  return (
    <div className='flex bg-amber-500 text-black text-2xl h-20 justify-center items-center font-semibold'>
      <div className="absolute left-2 p-2">
        <Image src={Logo} alt="logo" role="img"/>
      </div>
      <h1>Memorista</h1>
    </div>
  )
}

export default Header