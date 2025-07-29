import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Truck, Palette, Heart, Sparkles } from "lucide-react";

// Animation Variants
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, duration: 0.5 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

const quoteVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

// Reusable Service Card Component
const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
  delay,
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="group relative overflow-hidden rounded-xl border border-border/40 bg-background/50 p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={itemVariants}
      transition={{ delay: shouldReduceMotion ? 0 : delay }}
      whileHover={
        shouldReduceMotion
          ? {}
          : {
              y: -5,
              transition: { duration: 0.2 },
            }
      }
    >
      {/* Gradient overlay on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          className="mb-4 inline-flex rounded-full bg-primary/10 p-3 text-primary"
          whileHover={shouldReduceMotion ? {} : { scale: 1.05, rotate: 5 }}
          transition={{ duration: 0.2 }}
        >
          {icon}
        </motion.div>

        {/* Title */}
        <h3 className="mb-3 font-serif text-xl font-semibold tracking-tight text-foreground">
          {title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>

      {/* Decorative corner element */}
      <motion.div
        className="absolute -bottom-2 -right-2 h-16 w-16 rounded-full bg-primary/5 opacity-0"
        whileHover={{ opacity: 1, scale: 1.2 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

const Services: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const services = [
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Custom Design",
      description:
        "Work with our expert designers to create personalized floral arrangements that perfectly match your vision, style, and occasion. Every detail is crafted to your specifications.",
      delay: 0.1,
    },
    {
      icon: <Truck className="h-6 w-6" />,
      title: "Delivery Service",
      description:
        "Reliable delivery throughout the Philippines with special care for delicate arrangements. Same-day delivery available for fresh flowers in Metro Manila and surrounding areas.",
      delay: 0.2,
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Event Planning",
      description:
        "Complete floral solutions for weddings, corporate events, and special celebrations. From concept to execution, we handle all your floral decoration needs.",
      delay: 0.3,
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Maintenance & Care",
      description:
        "Expert guidance on caring for your flowers, plus maintenance services for artificial arrangements. We ensure your investment in beauty lasts as long as possible.",
      delay: 0.4,
    },
  ];

  return (
    <section className="relative overflow-hidden py-24 md:py-36">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute left-1/3 top-1/4 h-[30rem] w-[30rem] rounded-full bg-primary/5 blur-3xl"
          animate={
            shouldReduceMotion
              ? {}
              : {
                  x: [0, -30, 0],
                  y: [0, 20, 0],
                }
          }
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 h-[25rem] w-[25rem] rounded-full bg-secondary/5 blur-2xl"
          animate={
            shouldReduceMotion
              ? {}
              : {
                  x: [0, 25, 0],
                  y: [0, -15, 0],
                }
          }
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />
      </div>

      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          className="mx-auto mb-16 max-w-3xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <motion.div
            className="mb-4 inline-flex rounded-full border border-border bg-background/80 px-4 py-2 backdrop-blur-sm"
            variants={itemVariants}
            whileHover={shouldReduceMotion ? {} : { y: -2 }}
          >
            <p className="text-sm font-medium text-muted-foreground">
              OUR SERVICES
            </p>
          </motion.div>

          <motion.h2
            className="mb-6 font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl"
            variants={itemVariants}
          >
            How We Serve You
          </motion.h2>

          <motion.p
            className="text-lg text-foreground/80 md:text-xl"
            variants={itemVariants}
          >
            From custom design to delivery and care, we provide comprehensive
            floral services to make your experience seamless and beautiful.
          </motion.p>
        </motion.div>

        {/* Services grid */}
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-2">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>

        {/* Inspirational quote section */}
        <motion.div
          className="mx-auto mt-20 max-w-4xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={quoteVariants}
        >
          <div className="relative overflow-hidden rounded-2xl border border-border/40 bg-card/30 p-8 backdrop-blur-sm md:p-12">
            {/* Quote icon */}
            <motion.div
              className="mx-auto mb-6 inline-flex rounded-full bg-primary/10 p-4 text-primary"
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      scale: [1, 1.05, 1],
                    }
              }
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Heart className="h-8 w-8" />
            </motion.div>

            {/* Quote text */}
            <blockquote className="mb-6 font-serif text-2xl font-medium italic leading-relaxed text-foreground md:text-3xl">
              "Flowers are the music of the ground, from earth's lips spoken
              without sound. We bring this silent symphony to your life."
            </blockquote>

            {/* Attribution */}
            <p className="text-sm font-medium text-muted-foreground">
              — Koamishin Philosophy
            </p>

            {/* Decorative elements */}
            <motion.div
              className="absolute -left-4 -top-4 h-24 w-24 rounded-full bg-primary/5 blur-xl"
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }
              }
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -bottom-4 -right-4 h-32 w-32 rounded-full bg-secondary/5 blur-xl"
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      scale: [1, 1.1, 1],
                      opacity: [0.2, 0.5, 0.2],
                    }
              }
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </div>
        </motion.div>

        {/* Values section */}
        <motion.div
          className="mx-auto mt-20 max-w-4xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <motion.h3
            className="mb-8 font-serif text-3xl font-bold text-foreground md:text-4xl"
            variants={itemVariants}
          >
            Our Commitment to You
          </motion.h3>

          <motion.div
            className="grid gap-6 md:grid-cols-3"
            variants={sectionVariants}
          >
            <motion.div
              className="rounded-lg border border-border/40 bg-background/50 p-6 backdrop-blur-sm"
              variants={itemVariants}
              whileHover={shouldReduceMotion ? {} : { y: -3 }}
            >
              <h4 className="mb-2 font-semibold text-foreground">Quality</h4>
              <p className="text-sm text-muted-foreground">
                Every flower and arrangement meets our highest standards of
                beauty and craftsmanship.
              </p>
            </motion.div>

            <motion.div
              className="rounded-lg border border-border/40 bg-background/50 p-6 backdrop-blur-sm"
              variants={itemVariants}
              whileHover={shouldReduceMotion ? {} : { y: -3 }}
            >
              <h4 className="mb-2 font-semibold text-foreground">Service</h4>
              <p className="text-sm text-muted-foreground">
                Personalized attention and care for every customer, from
                consultation to delivery.
              </p>
            </motion.div>

            <motion.div
              className="rounded-lg border border-border/40 bg-background/50 p-6 backdrop-blur-sm"
              variants={itemVariants}
              whileHover={shouldReduceMotion ? {} : { y: -3 }}
            >
              <h4 className="mb-2 font-semibold text-foreground">Heritage</h4>
              <p className="text-sm text-muted-foreground">
                Proudly showcasing Filipino artistry and craftsmanship in every
                creation.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
