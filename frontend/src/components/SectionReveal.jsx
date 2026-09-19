import { motion } from "framer-motion";

export default function SectionReveal({
  children,
  className = "",
  delay = 0,
  as = "div",
  id,
  ...rest
}) {
  const Component = motion[as] || motion.div;
  return (
    <Component
      id={id}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </Component>
  );
}
