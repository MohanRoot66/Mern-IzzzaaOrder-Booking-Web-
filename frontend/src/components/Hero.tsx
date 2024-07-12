import Image from "../assets/hero.png"

const Hero = () => {
  return(
    <div>
        <img src={Image} alt="" className="w-full max-h-[600px] object-cover"/>
    </div>
  )
}

export default Hero;