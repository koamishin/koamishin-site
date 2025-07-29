import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Phone,
  ArrowUpRight,
  Flower,
  Heart,
  Sparkles,
  CheckCircle,
  Palette,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Interface for flower product categories
interface ProductCategory {
  icon: React.ReactNode;
  title: string;
  status?: "Available" | "Seasonal" | "Custom Order";
  shortDescription: string;
  longDescription: string;
  features: string[];
  occasions: string[];
  contactUrl: string;
  imageUrl?: string;
}

// Product categories data
const productCategories: ProductCategory[] = [
  {
    icon: <Flower className="h-12 w-12 text-primary" />,
    title: "Artificial Flowers",
    status: "Available",
    shortDescription: "Premium handcrafted artificial flowers that last forever.",
    longDescription:
      "Our artificial flowers are meticulously crafted using the finest materials to replicate the natural beauty of real flowers. Each piece is hand-finished by skilled Filipino artisans, ensuring exceptional quality and attention to detail that will maintain its beauty for years to come.",
    features: [
      "Handcrafted by Filipino artisans",
      "Premium silk and fabric materials",
      "Fade-resistant and long-lasting",
      "No maintenance required",
    ],
    occasions: [
      "Weddings",
      "Home Decor",
      "Office Spaces",
      "Events",
    ],
    contactUrl: "#contact",
  },
  {
    icon: <Heart className="h-12 w-12 text-primary" />,
    title: "Natural Fresh Flowers",
    status: "Available",
    shortDescription: "Fresh, vibrant flowers sourced from Philippine gardens.",
    longDescription:
      "Our natural flowers are carefully selected from the best gardens across the Philippines. We work directly with local growers to ensure the freshest, most vibrant blooms reach our customers. Each arrangement is created with flowers picked at their peak beauty.",
    features: [
      "Sourced from Philippine gardens",
      "Daily fresh selections",
      "Eco-friendly packaging",
      "Same-day delivery available",
    ],
    occasions: [
      "Romantic Gestures",
      "Celebrations",
      "Sympathy",
      "Special Occasions",
    ],
    contactUrl: "#contact",
  },
  {
    icon: <Sparkles className="h-12 w-12 text-primary" />,
    title: "Wedding Collections",
    status: "Custom Order",
    shortDescription: "Bespoke wedding arrangements for your special day.",
    longDescription:
      "Make your wedding day unforgettable with our custom wedding flower collections. We work closely with couples to create personalized arrangements that reflect their unique style and vision. From bridal bouquets to ceremony decorations, every detail is crafted with love.",
    features: [
      "Custom design consultation",
      "Bridal and bridesmaid bouquets",
      "Ceremony and reception decor",
      "Color-matched arrangements",
    ],
    occasions: [
      "Wedding Ceremonies",
      "Receptions",
      "Engagement Parties",
      "Bridal Showers",
    ],
    contactUrl: "#contact",
  },
];

const Products: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.5 },
    },
  };

  return (
    <section className="relative overflow-hidden py-24 md:py-36">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute left-1/4 top-1/4 h-[25rem] w-[25rem] rounded-full bg-primary/5 blur-3xl"
          animate={
            shouldReduceMotion
              ? {}
              : {
                  x: [0, 20, 0],
                  y: [0, -15, 0],
                }
          }
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 h-[20rem] w-[20rem] rounded-full bg-secondary/5 blur-2xl"
          animate={
            shouldReduceMotion
              ? {}
              : {
                  x: [0, -25, 0],
                  y: [0, 20, 0],
                }
          }
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
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
          variants={containerVariants}
        >
          <motion.div
            className="mb-4 inline-flex rounded-full border border-border bg-background/80 px-4 py-2 backdrop-blur-sm"
            variants={itemVariants}
            whileHover={shouldReduceMotion ? {} : { y: -2 }}
          >
            <p className="text-sm font-medium text-muted-foreground">
              OUR COLLECTIONS
            </p>
          </motion.div>

          <motion.h2
            className="mb-6 font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl"
            variants={itemVariants}
          >
            Flower Categories
          </motion.h2>

          <motion.p
            className="text-lg text-foreground/80 md:text-xl"
            variants={itemVariants}
          >
            Discover our carefully curated selection of artificial and natural
            flowers, each category designed to bring beauty and elegance to your
            special moments.
          </motion.p>
        </motion.div>

        {/* Product categories grid */}
        <motion.div
          className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {productCategories.map((category, index) => (
            <ProductCard key={index} category={category} index={index} />
          ))}
        </motion.div>

        {/* Call to action */}
        <motion.div
          className="mx-auto mt-20 max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="mb-4 text-2xl font-bold text-foreground">
            Ready to Create Something Beautiful?
          </h3>
          <p className="mb-6 text-muted-foreground">
            Contact us today to discuss your floral needs and let us help you
            create the perfect arrangement for your special occasion.
          </p>
          <Button size="lg" asChild>
            <a href="#contact" className="group">
              <Phone className="mr-2 h-5 w-5" />
              Get Custom Quote
              <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:translate-y-[-1px]" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

// Product card component
interface ProductCardProps {
  category: ProductCategory;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ category, index }) => {
  const shouldReduceMotion = useReducedMotion();

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.5,
        delay: shouldReduceMotion ? 0 : index * 0.1,
      },
    },
  };

  return (
    <motion.div
      className="group relative overflow-hidden rounded-xl border border-border bg-card/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
      variants={cardVariants}
      whileHover={
        shouldReduceMotion
          ? {}
          : {
              y: -5,
              transition: { duration: 0.2 },
            }
      }
    >
      {/* Status badge */}
      {category.status && (
        <div className="absolute right-4 top-4 z-10">
          <Badge
            variant={
              category.status === "Available"
                ? "default"
                : category.status === "Seasonal"
                ? "secondary"
                : "outline"
            }
            className="text-xs"
          >
            {category.status}
          </Badge>
        </div>
      )}

      <div className="p-6">
        {/* Icon and title */}
        <div className="mb-4 flex items-center gap-4">
          <motion.div
            className="rounded-full bg-primary/10 p-3"
            whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
          >
            {category.icon}
          </motion.div>
          <h3 className="font-serif text-xl font-bold text-foreground">
            {category.title}
          </h3>
        </div>

        {/* Short description */}
        <p className="mb-4 text-sm text-muted-foreground">
          {category.shortDescription}
        </p>

        {/* Features list */}
        <div className="mb-4">
          <h4 className="mb-2 flex items-center text-sm font-medium text-foreground">
            <CheckCircle className="mr-2 h-4 w-4 text-primary" />
            Key Features
          </h4>
          <ul className="space-y-1">
            {category.features.slice(0, 3).map((feature, idx) => (
              <li key={idx} className="text-xs text-muted-foreground">
                • {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Occasions */}
        <div className="mb-6">
          <h4 className="mb-2 flex items-center text-sm font-medium text-foreground">
            <Palette className="mr-2 h-4 w-4 text-primary" />
            Perfect For
          </h4>
          <div className="flex flex-wrap gap-1">
            {category.occasions.slice(0, 3).map((occasion, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs">
                {occasion}
              </Badge>
            ))}
          </div>
        </div>

        {/* Contact button */}
        <Button
          variant="outline"
          size="sm"
          asChild
          className="w-full group-hover:bg-primary group-hover:text-primary-foreground"
        >
          <a href={category.contactUrl}>
            Learn More
            <ArrowUpRight className="ml-2 h-3 w-3" />
          </a>
        </Button>
      </div>
    </motion.div>
  );
};

export default Products;
