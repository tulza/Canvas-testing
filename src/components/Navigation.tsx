import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

const Navigation = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <div className="fixed flex h-full items-center  ">
        <motion.div
          animate={open ? {} : { x: "-100%" }}
          transition={{ ease: "easeInOut" }}
          className="relative flex flex-col gap-4 rounded-r-xl bg-black p-4 py-6"
        >
          <div className="absolute right-0 top-[50%] aspect-square h-20 w-10 -translate-y-[50%] translate-x-[90%] rounded-r-2xl bg-black p-1.5">
            <div
              className="h-full w-full cursor-pointer rounded-xl bg-white"
              onClick={() => setOpen(!open)}
            >
              <div className="flex translate-y-[100%] -rotate-90 justify-center text-black">
                {open ? "open" : "close"}
              </div>
            </div>
          </div>
          <div className="edgeMask absolute right-0 top-[50%] aspect-square h-20 w-10 translate-x-[99%] translate-y-[50%] bg-black" />
          <div className="edgeMask absolute right-0 top-[50%] aspect-square h-20 w-10 origin-center -translate-y-[149%] translate-x-[100%] scale-y-[-1] bg-black outline-2 outline-white" />
          <div className="flex justify-center">Profiles</div>
          <NavButton name="menu" />
          <NavButton name="1" />
          <NavButton name="2" />
          <NavButton name="3" />
        </motion.div>
      </div>
    </>
  );
};

const NavButton = ({ name }: { name: string }) => {
  return (
    <Link to={`${name}`}>
      <motion.div className=" flex aspect-square items-center justify-center rounded-xl border-2 border-[#999] bg-black p-2">
        {name}
      </motion.div>
    </Link>
  );
};

export default Navigation;
