import { Typography, Button, Input } from "@material-tailwind/react";
import { motion } from "framer-motion";

export default function ComingSoonSection() {
  return (
    <section className="flex min-h-screen min-w-screen items-center justify-center">
      <div className=" mx-auto flex flex-col justify-center">
        <motion.div
          className="my-auto flex flex-col items-center justify-center text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <Typography as="h2" type="h3">
            Get Ready for Something Amazing!
          </Typography>
          <Typography className="max-w-3xl  mx-auto">
            We&apos;re excited to introduce our latest innovation that will
            change the way you watch movies 🎬. Stay tuned as we put the
            finishing touches on this game-changing product.
          </Typography>
          <div className="flex flex-col sm:flex-row max-w-md w-full gap-x-2 gap-y-4 mt-4 mx-auto">
            <Input
              size="lg"
              color="secondary"
              type="email"
              id="email"
              placeholder="someone@example.com"
              className="placeholder:text-white/60 text-white"
            />
            <Button size="lg" color="primary" className="shrink-0">
              Notify Me
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
