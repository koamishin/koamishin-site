import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Flower2, HeartHandshake } from "lucide-react";
// import { cn } from "@/lib/utils";

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ValueCard: React.FC<ValueCardProps> = ({ icon, title, description }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative overflow-hidden rounded-xl border border-border/40 bg-background/50 p-6 backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-50px" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <motion.div
        className="mb-4 inline-flex rounded-full bg-primary/10 p-3 text-primary"
        whileHover={{ scale: 1.05 }}
        animate={{
          y: isHovered ? [0, -5, 0] : 0,
        }}
        transition={{
          duration: 1,
          repeat: isHovered ? Infinity : 0,
          repeatType: "reverse",
        }}
      >
        {icon}
      </motion.div>

      <h3 className="mb-2 font-serif text-xl font-semibold tracking-tight text-foreground">
        {title}
      </h3>

      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
};

const About: React.FC = () => {
  const values = [
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Philippine Heritage",
      description:
        "Proudly sourcing and crafting flowers with traditional Filipino artistry, bringing authentic beauty from our islands to your home.",
    },
    {
      icon: <Flower2 className="h-6 w-6" />,
      title: "Premium Quality",
      description:
        "Every flower is carefully selected and crafted to meet the highest standards, ensuring lasting beauty for your special moments.",
    },
    {
      icon: <HeartHandshake className="h-6 w-6" />,
      title: "Customer Dedication",
      description:
        "We believe in creating meaningful connections through flowers, providing personalized service and care for every customer.",
    },
  ];

  return (
    <section className="relative overflow-hidden py-24 md:py-36">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 -z-10 bg-muted/30">
        <motion.div
          className="absolute left-1/4 top-1/3 h-[30rem] w-[30rem] rounded-full bg-secondary/5 blur-3xl"
          animate={{
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute right-1/4 top-2/3 h-[20rem] w-[20rem] rounded-full bg-primary/5 blur-2xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="container mx-auto px-4">
        {/* Section title with animation */}
        <motion.div
          className="mx-auto mb-16 max-w-xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="mb-3 inline-flex rounded-full border border-border bg-background/80 px-4 py-1.5 backdrop-blur-sm"
            whileHover={{ y: -2 }}
          >
            <p className="text-sm font-medium text-muted-foreground">
              OUR STORY
            </p>
          </motion.div>

          <h2 className="mb-6 font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            About Koamishin
          </h2>

          <p className="text-lg text-foreground/80">
            Koamishin is a passionate collective dedicated to bringing
            the natural beauty and artistry of the Philippines to your special
            moments through premium artificial and natural flowers.
          </p>
        </motion.div>

        {/* Main content with staggered animation */}
        <div className="mx-auto mb-16 max-w-3xl">
          <motion.div
            className="space-y-6 text-center font-sans text-lg leading-relaxed text-foreground/80"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Our passion lies in creating beautiful{" "}
              <motion.span
                className="font-medium text-foreground"
                whileHover={{
                  color: "var(--primary)",
                  transition: { duration: 0.2 },
                }}
              >
                Wedding Bouquets
              </motion.span>
              ,{" "}
              <motion.span
                className="font-medium text-foreground"
                whileHover={{
                  color: "var(--primary)",
                  transition: { duration: 0.2 },
                }}
              >
                Event Arrangements
              </motion.span>
              , and stunning{" "}
              <motion.span
                className="font-medium text-foreground"
                whileHover={{
                  color: "var(--primary)",
                  transition: { duration: 0.2 },
                }}
              >
                Home Decorations
              </motion.span>{" "}
              – all crafted with the finest materials and traditional Filipino
              artistry that has been passed down through generations.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              We believe in the power of flowers to bring joy, celebrate love,
              and create lasting memories. By combining traditional Filipino
              craftsmanship with modern design, we aim to make every occasion
              more beautiful and meaningful for our customers.
            </motion.p>
          </motion.div>
        </div>

        {/* Values section */}
        <motion.h3
          className="mb-8 text-center text-xl font-medium text-foreground md:text-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Our Core Values
        </motion.h3>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {values.map((value, index) => (
            <ValueCard key={index} {...value} />
          ))}
        </div>

        {/* Call to collaborate section */}
        <motion.div
          className="mx-auto mt-20 max-w-2xl rounded-xl border border-border bg-card/30 p-8 text-center backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{
            boxShadow: "0 0 30px rgba(var(--primary), 0.1)",
            transition: { duration: 0.3 },
          }}
        >
          <motion.div
            className="mb-4 inline-flex rounded-full border border-primary/20 bg-primary/10 p-3 text-primary"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <HeartHandshake className="h-6 w-6" />
          </motion.div>

          <h3 className="mb-3 text-2xl font-bold text-foreground">
            Experience Our Craftsmanship
          </h3>

          <p className="mb-6 text-muted-foreground">
            We invite you to discover the beauty of Philippine flowers. Whether
            you're planning a wedding, decorating your home, or celebrating a
            special occasion, we're here to help make it unforgettable.
          </p>

          <motion.a
            href="#contact"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <HeartHandshake className="mr-2 h-4 w-4" />
            Get in Touch
          </motion.a>
        </motion.div>
      </div>

      {/* Decorative floating code element */}
      <motion.div
        className="absolute -bottom-6 -right-6 hidden h-24 w-24 rotate-12 rounded-lg border border-border bg-card/20 backdrop-blur-sm md:block"
        initial={{ opacity: 0, x: 20, y: 20 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
        whileHover={{
          rotate: 0,
          scale: 1.05,
          transition: { duration: 0.3 },
        }}
      >
        <div className="flex h-full items-center justify-center">
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Flower2 className="h-8 w-8 text-primary/60" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
