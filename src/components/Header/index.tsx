import Logo from "@/app/icon.png"
import Image from "next/image"

const Header = () => {
  return (
    <div className='flex text-black h-20 justify-center items-end mb-16'>
      <div className="absolute left-2 p-2">
        <Image src={Logo} alt="logo" role="img" />
      </div>
      <h1 className="text-4xl font-semibold font-mono p-1">Memorista</h1>
    </div>
  )
}

export default Header