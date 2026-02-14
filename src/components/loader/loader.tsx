import { motion } from "motion/react";
import { anim } from "@/util";
import { opacity } from "./animation";
import "./loader.scss";

export const Loader = () => {
  return (
    <motion.div className="c-loader" {...anim(opacity)}>
      <div className="loader">
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </motion.div>
  );
};
