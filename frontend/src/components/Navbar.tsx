import { useGSAP } from "@gsap/react"

import gsap from "gsap"

const navLinks = ["Experts", "Community Groups", "Support"];
const Navbar = () => {
    useGSAP( ()=> {
        const navTween = gsap.timeline({
            scrollTrigger: {
                trigger: "nav",
                start: "bottom top"
            }

        })
        navTween.fromTo( "nav", { backgroundColor: 'transparent'}, {
            backgroundColor: '#00000050',
            backgroundFilter: 'blue(10px)',
            duration: 1,
            ease: 'power1.inOut'
    })
    })
  return (
<nav>
    <div>
        <a href="#home" className=" flex items-center gap-2">
           <img src="/RateLock.svg" className="w-40 h-auto" alt="LOGO" />
           
        </a>

        <ul>
            {navLinks.map((id) => (
                <li key={id}>
                    <a href={`#home`}>
                        {navLinks}
                    </a>
                </li>
            ))}
        </ul>
    </div>
</nav>
  )
}

export {Navbar}
