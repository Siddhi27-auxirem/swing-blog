import {motion} from "framer-motion";

export default function PageWrapper({children}:{children:React.ReactNode}){
    return(
        <motion.div
        initial={{opacity:0,y:20}} //Start hidden + slightly down
        animate={{opacity:1,y:0}} //Fade in + slide up
        exit={{opacity:0, y:-20}} //Fade out + slide up
        transition={{duration: 0.4, ease: "easeInOut"}}
        className="flex-1"
        >
            {children}
        </motion.div>
    );
}